import {scale, verticalScale} from "../utils/styling";


export const colors = {
  primary: "#32CD32",      // Vibrant green (matches logo lightning bolt)
  secondary: "#00BFFF",    // Bright blue (matches logo swoosh)
  accent: "#7CFC00",       // Light green for highlights
  background: "#0D1B1E",   // Dark navy background (from logo backdrop)
  surface: "#F5F5F5",      // Light neutral for cards or surfaces
  textPrimary: "#FFFFFF",  // White for main text
  textSecondary: "#A9A9A9",// Muted gray for secondary text
  success: "#28A745",      // Green for success states
  warning: "#FFC107",      // Yellow for warnings
  error: "#ef5463ff",        // Red for errors
  buttonPrimary: "#32CD32",// Primary button color
  buttonSecondary: "#00BFFF",// Secondary button color
};


//used for margin and padding on left and right
export const spacingX = {
    _3: scale(3),
    _5: scale(5),
    _7: scale(7),
    _10: scale(10),
    _12: scale(12),
    _15: scale(15),
    _20: scale(20),
    _25: scale(25),
    _30: scale(30),
    _35: scale(35),
    _40: scale(40),
}

//used for margin and padding on top and bottom
export const spacingY = {
    _5: verticalScale(5),
    _7: verticalScale(7),
    _10: verticalScale(10),
    _12: verticalScale(12),
    _15: verticalScale(15),
    _17: verticalScale(17),
    _20: verticalScale(20),
    _25: verticalScale(25),
    _30: verticalScale(30),
    _35: verticalScale(35),
    _40: verticalScale(40),
    _50: verticalScale(50),
    _60: verticalScale(60),
}

//used for border radius
export const radius = {
    _3: verticalScale(3),
    _6: verticalScale(6),
    _10: verticalScale(10),
    _12: verticalScale(12),
    _15: verticalScale(15),
    _17: verticalScale(17),
    _20: verticalScale(20),
    _30: verticalScale(30),
}