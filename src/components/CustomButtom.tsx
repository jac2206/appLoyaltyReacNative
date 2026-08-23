import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../context/ThemeContext';
import { Colors } from '../styles/colors';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'danger';
  loading?: boolean;
  disabled?: boolean;
  accessibilityHint?: string;
}

export function CustomButton({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  accessibilityHint,
}: Props) {
  const { colors } = useTheme();

  const styles = createStyles(colors);

  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{
        disabled: isDisabled,
        busy: loading,
      }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,

        variant === 'outline' && styles.outlineButton,

        variant === 'danger' && styles.dangerButton,

        isDisabled && styles.disabled,

        pressed && !isDisabled && styles.pressed,
      ]}
    >
      <View style={styles.content}>
        {loading && (
          <ActivityIndicator
            color={variant === 'outline' ? colors.primary : colors.white}
          />
        )}

        <Text style={[styles.text, variant === 'outline' && styles.outlineText]}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

function createStyles(colors: Colors) {
  return StyleSheet.create({
    button: {
      backgroundColor: colors.primary,
      minHeight: 52,
      paddingHorizontal: 20,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 16,
    },

    content: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },

    outlineButton: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.primary,
    },

    dangerButton: {
      backgroundColor: colors.error,
    },

    disabled: {
      opacity: 0.55,
    },

    pressed: {
      transform: [
        {
          scale: 0.98,
        },
      ],
    },

    text: {
      color: colors.white,
      fontSize: 16,
      fontWeight: 'bold',
    },

    outlineText: {
      color: colors.primary,
    },
  });
}
