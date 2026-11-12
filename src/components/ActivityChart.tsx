import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useTheme } from "../context/ThemeContext";
import type { Colors } from "../styles/colors";
import { spacing, typography } from "../styles/tokens";
import { getCurrentWeekLabel } from "../utils/date-util";

interface Props {
  data: number[];
}

export function ActivityChart({ data }: Props) {
  const { colors } = useTheme();

  const styles = createStyles(colors);
  const [availableWidth, setAvailableWidth] = useState(0);

  const days = ["L", "M", "M", "J", "V", "S", "D"];

  const weekLabel = getCurrentWeekLabel();

  const [selected, setSelected] = useState<{
    day: string;
    value: number;
  } | null>(null);

  const chartData = data.map((value, index) => ({
    value,

    label: days[index],

    frontColor: colors.primary,

    onPress: () =>
      setSelected({
        day: days[index],
        value,
      }),
  }));

  return (
    <View
      style={styles.container}
      onLayout={(event) =>
        setAvailableWidth(event.nativeEvent.layout.width - spacing.lg * 2)
      }
    >
      <Text style={styles.title}>Actividad semanal</Text>

      <Text style={styles.subtitle}>{weekLabel}</Text>

      {availableWidth > 0 && (
        <BarChart
          data={chartData}
          width={Math.max(120, availableWidth - 48)}
          barWidth={Math.max(8, (availableWidth - 72) / 14)}
          spacing={Math.max(6, (availableWidth - 72) / 14)}
          initialSpacing={8}
          endSpacing={8}
          roundedTop
          yAxisThickness={0}
          xAxisThickness={0}
          noOfSections={4}
          rulesColor={colors.border}
          xAxisLabelTextStyle={styles.axisLabel}
          yAxisTextStyle={styles.axisLabel}
        />
      )}

      {selected && (
        <Text style={styles.selectedText}>
          Seleccionado {selected.day}: {selected.value} pts
        </Text>
      )}
    </View>
  );
}

function createStyles(colors: Colors) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      padding: spacing.lg,
      borderRadius: 16,
      borderColor: colors.border,
      borderWidth: 1,
      elevation: 1,
    },

    title: {
      color: colors.textDark,
      ...typography.subheading,
    },

    subtitle: {
      color: colors.textMuted,
      ...typography.caption,
      marginBottom: 15,
    },

    axisLabel: {
      color: colors.textMuted,
      ...typography.caption,
    },

    selectedText: {
      color: colors.textDark,
      marginTop: 10,
      ...typography.small,
    },
  });
}
