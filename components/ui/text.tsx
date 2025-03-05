import * as ReactNative from "react-native";
import * as React from "react";
import { useTheme } from "@react-navigation/native";

interface TextProps extends ReactNative.TextProps {}

const Text = React.forwardRef<
  React.ElementRef<typeof ReactNative.Text>,
  TextProps
>(({ style, children, ...props }, ref) => {
  const theme = useTheme();

  return (
    <ReactNative.Text
      style={[{ color: theme.colors.text }, style]}
      ref={ref}
      {...props}
    >
      {children}
    </ReactNative.Text>
  );
});

export { Text };
