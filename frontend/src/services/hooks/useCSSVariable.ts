import { useEffect, useState } from "react";

type ColorType = "oklch" | "rgb" | "rgba" | "hex" | "hsl" | "hsla" | "original";

export function useCSSVariable(
   variableName: string,
   opacity: number = 1,
   returnType: ColorType = "original"
) {
   const [value, setValue] = useState("");

   // OKLCH to RGB conversion
   const oklchToRgb = (
      l: number,
      c: number,
      h: number
   ): [number, number, number] => {
      // Convert OKLCH to OKLAB
      const hRad = (h * Math.PI) / 180;
      const a = c * Math.cos(hRad);
      const b = c * Math.sin(hRad);

      // OKLAB to linear RGB
      const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
      const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
      const s_ = l - 0.0894841775 * a - 1.291485548 * b;

      const l3 = l_ * l_ * l_;
      const m3 = m_ * m_ * m_;
      const s3 = s_ * s_ * s_;

      // Linear RGB
      let r = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
      let g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
      let b_rgb = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;

      // Gamma correction (linear to sRGB)
      const gammaCorrect = (c: number) => {
         if (c <= 0.0031308) {
            return 12.92 * c;
         } else {
            return 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
         }
      };

      r = gammaCorrect(Math.max(0, Math.min(1, r)));
      g = gammaCorrect(Math.max(0, Math.min(1, g)));
      b_rgb = gammaCorrect(Math.max(0, Math.min(1, b_rgb)));

      return [
         Math.round(r * 255),
         Math.round(g * 255),
         Math.round(b_rgb * 255),
      ];
   };

   // Helper function to convert colors

   useEffect(() => {
      const convertColor = (
         color: string,
         targetType: ColorType,
         alpha: number
      ) => {
         const getRGBFromColor = (
            colorStr: string
         ): [number, number, number] | null => {
            if (colorStr.startsWith("oklch(")) {
               const oklchMatch = colorStr.match(
                  /oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)/
               );
               if (oklchMatch) {
                  const l = parseFloat(oklchMatch[1]);
                  const c = parseFloat(oklchMatch[2]);
                  const h = parseFloat(oklchMatch[3]);
                  return oklchToRgb(l, c, h);
               }
            } else if (colorStr.startsWith("rgb(")) {
               const rgbMatch = colorStr.match(
                  /rgb\((\d+),?\s*(\d+),?\s*(\d+)\)/
               );
               if (rgbMatch) {
                  return [
                     parseInt(rgbMatch[1]),
                     parseInt(rgbMatch[2]),
                     parseInt(rgbMatch[3]),
                  ];
               }
            } else if (colorStr.startsWith("#")) {
               const hex = colorStr.replace("#", "");
               const r = parseInt(hex.substring(0, 2), 16);
               const g = parseInt(hex.substring(2, 4), 16);
               const b = parseInt(hex.substring(4, 6), 16);
               return [r, g, b];
            } else if (colorStr.startsWith("hsl(")) {
               const hslMatch = colorStr.match(
                  /hsl\((\d+),?\s*(\d+)%,?\s*(\d+)%\)/
               );
               if (hslMatch) {
                  const h = parseInt(hslMatch[1]) / 360;
                  const s = parseInt(hslMatch[2]) / 100;
                  const l = parseInt(hslMatch[3]) / 100;

                  const hue2rgb = (p: number, q: number, t: number) => {
                     if (t < 0) t += 1;
                     if (t > 1) t -= 1;
                     if (t < 1 / 6) return p + (q - p) * 6 * t;
                     if (t < 1 / 2) return q;
                     if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                     return p;
                  };

                  if (s === 0) {
                     const gray = Math.round(l * 255);
                     return [gray, gray, gray];
                  } else {
                     const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                     const p = 2 * l - q;
                     const r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
                     const g = Math.round(hue2rgb(p, q, h) * 255);
                     const b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);
                     return [r, g, b];
                  }
               }
            }
            return null;
         };

         const rgb = getRGBFromColor(color);
         if (!rgb) return color;

         const [r, g, b] = rgb;

         switch (targetType) {
            case "hex": {
               const toHex = (n: number) => n.toString(16).padStart(2, "0");
               if (alpha < 1) {
                  // Return 8-digit hex with alpha when opacity is less than 1
                  const alphaHex = Math.round(alpha * 255)
                     .toString(16)
                     .padStart(2, "0");
                  return `#${toHex(r)}${toHex(g)}${toHex(b)}${alphaHex}`;
               } else {
                  // Standard 6-digit hex when fully opaque
                  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
               }
            }
            case "rgb": {
               return `rgb(${r}, ${g}, ${b})`;
            }

            case "rgba": {
               return `rgba(${r}, ${g}, ${b}, ${alpha})`;
            }

            case "hsl": {
               const rNorm = r / 255;
               const gNorm = g / 255;
               const bNorm = b / 255;

               const max = Math.max(rNorm, gNorm, bNorm);
               const min = Math.min(rNorm, gNorm, bNorm);
               const diff = max - min;
               const sum = max + min;
               const l = sum / 2;

               if (diff === 0) {
                  return `hsl(0, 0%, ${Math.round(l * 100)}%)`;
               }

               const s = l > 0.5 ? diff / (2 - sum) : diff / sum;

               let h: number;
               switch (max) {
                  case rNorm:
                     h = ((gNorm - bNorm) / diff + (gNorm < bNorm ? 6 : 0)) / 6;
                     break;
                  case gNorm:
                     h = ((bNorm - rNorm) / diff + 2) / 6;
                     break;
                  case bNorm:
                     h = ((rNorm - gNorm) / diff + 4) / 6;
                     break;
                  default:
                     h = 0;
               }

               return `hsl(${Math.round(h * 360)}, ${Math.round(
                  s * 100
               )}%, ${Math.round(l * 100)}%)`;
            }

            case "hsla": {
               const rNorm2 = r / 255;
               const gNorm2 = g / 255;
               const bNorm2 = b / 255;

               const max2 = Math.max(rNorm2, gNorm2, bNorm2);
               const min2 = Math.min(rNorm2, gNorm2, bNorm2);
               const diff2 = max2 - min2;
               const sum2 = max2 + min2;
               const l2 = sum2 / 2;

               if (diff2 === 0) {
                  return `hsla(0, 0%, ${Math.round(l2 * 100)}%, ${alpha})`;
               }

               const s2 = l2 > 0.5 ? diff2 / (2 - sum2) : diff2 / sum2;

               let h2: number;
               switch (max2) {
                  case rNorm2:
                     h2 =
                        ((gNorm2 - bNorm2) / diff2 +
                           (gNorm2 < bNorm2 ? 6 : 0)) /
                        6;
                     break;
                  case gNorm2:
                     h2 = ((bNorm2 - rNorm2) / diff2 + 2) / 6;
                     break;
                  case bNorm2:
                     h2 = ((rNorm2 - gNorm2) / diff2 + 4) / 6;
                     break;
                  default:
                     h2 = 0;
               }

               return `hsla(${Math.round(h2 * 360)}, ${Math.round(
                  s2 * 100
               )}%, ${Math.round(l2 * 100)}%, ${alpha})`;
            }

            case "oklch": {
               if (color.startsWith("oklch(")) {
                  const oklchMatch = color.match(/oklch\((.*?)\)/);
                  if (oklchMatch) {
                     const values = oklchMatch[1].split(" ");
                     return `oklch(${values[0]} ${values[1]} ${values[2]} / ${alpha})`;
                  }
               }
               return `rgba(${r}, ${g}, ${b}, ${alpha})`;
            }

            default:
               return color;
         }
      };
      const rootStyles = getComputedStyle(document.documentElement);
      const cssValue = rootStyles.getPropertyValue(variableName).trim();

      if (!cssValue) {
         setValue("");
         return;
      }

      if (returnType === "original") {
         if (opacity === 1) {
            setValue(cssValue);
            return;
         }

         if (cssValue.startsWith("oklch(")) {
            const oklchMatch = cssValue.match(/oklch\((.*?)\)/);
            if (oklchMatch) {
               const values = oklchMatch[1].split(" ");
               setValue(
                  `oklch(${values[0]} ${values[1]} ${values[2]} / ${opacity})`
               );
            }
         } else if (cssValue.startsWith("rgb(")) {
            const rgbMatch = cssValue.match(/rgb\((\d+),?\s*(\d+),?\s*(\d+)\)/);
            if (rgbMatch) {
               setValue(
                  `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${opacity})`
               );
            }
         } else if (cssValue.startsWith("#")) {
            const hex = cssValue.replace("#", "");
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            setValue(`rgba(${r}, ${g}, ${b}, ${opacity})`);
         } else if (cssValue.startsWith("hsl(")) {
            const hslMatch = cssValue.match(
               /hsl\((\d+),?\s*(\d+)%,?\s*(\d+)%\)/
            );
            if (hslMatch) {
               setValue(
                  `hsla(${hslMatch[1]}, ${hslMatch[2]}%, ${hslMatch[3]}%, ${opacity})`
               );
            }
         } else {
            setValue(
               `color-mix(in srgb, ${cssValue} ${opacity * 100}%, transparent)`
            );
         }
      } else {
         const convertedColor = convertColor(cssValue, returnType, opacity);
         setValue(convertedColor);
      }
   }, [variableName, opacity, returnType]);

   return value;
}
