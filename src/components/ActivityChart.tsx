import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useTheme } from "../context/ThemeContext";
import type { Colors } from "../styles/colors";
import { getCurrentWeekLabel } from "../utils/date-util";

interface Props {
  data: number[];
}

export function ActivityChart({ data }: Props) {
  const { colors } = useTheme();

  const styles = createStyles(colors);

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
    <View style={styles.container}>
      <Text style={styles.title}>Actividad semanal</Text>

      <Text style={styles.subtitle}>{weekLabel}</Text>

      <BarChart
        data={chartData}
        barWidth={22}
        spacing={20}
        roundedTop
        yAxisThickness={0}
        xAxisThickness={0}
        noOfSections={4}
        rulesColor={colors.border}
        xAxisLabelTextStyle={styles.axisLabel}
        yAxisTextStyle={styles.axisLabel}
        isAnimated
      />

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
      padding: 20,
      borderRadius: 16,
      borderColor: colors.border,
      borderWidth: 1,
      elevation: 1,
    },

    title: {
      color: colors.textDark,
      fontSize: 16,
      fontWeight: "bold",
    },

    subtitle: {
      color: colors.textMuted,
      fontSize: 12,
      marginBottom: 15,
    },

    axisLabel: {
      color: colors.textMuted,
      fontSize: 12,
    },

    selectedText: {
      color: colors.textDark,
      marginTop: 10,
      fontSize: 14,
      fontWeight: "500",
    },
  });
}
