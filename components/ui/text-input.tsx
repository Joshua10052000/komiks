import * as ReactNative from "react-native";
import * as React from "react";
import { Theme, useTheme } from "@react-navigation/native";
import styles from "@/constants/styles";

interface TextInputProps extends ReactNative.TextInputProps {}

const TextInput = React.forwardRef<
  React.ElementRef<typeof ReactNative.TextInput>,
  TextInputProps
>(({ style, children, ...props }, ref) => {
  const theme = useTheme();
  const { textInput } = createStyles(theme);

  return (
    <ReactNative.TextInput
      style={[textInput, style]}
      placeholderTextColor={theme.colors.text}
      ref={ref}
      {...props}
    />
  );
});

const createStyles = (theme: Theme) =>
  ReactNative.StyleSheet.create({
    textInput: {
      borderStyle: "solid",
      borderLeftWidth: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
      borderTopLeftRadius: styles.sizes[2],
      borderBottomLeftRadius: styles.sizes[2],
      paddingHorizontal: styles.sizes[4],
      paddingVertical: styles.sizes[2],
      color: theme.colors.text,
      backgroundColor: theme.colors.background,
      minHeight: styles.sizes[10],
      maxHeight: styles.sizes[10],
    },
  });

export { TextInput };
