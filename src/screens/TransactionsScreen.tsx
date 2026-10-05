import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ScreenHeader } from "../components/ScreenHeader";
import { useTheme } from "../context/ThemeContext";
import { TransactionFilter, useTransactions } from "../hooks/useTransactions";
import { createTransactionsStyles } from "../styles/transactions.styles";
import { MainStackParamList } from "../types/navigation";
import { TransactionRecord } from "../types/transaction";

type Props = NativeStackScreenProps<MainStackParamList, "Transactions">;

const PAGE_SIZE = 10;
const filters: Array<{ label: string; value: TransactionFilter }> = [
  { label: "Todos", value: "ALL" },
  { label: "Acumulados", value: "ACUM" },
  { label: "Redenciones", value: "REDEM" },
];

export function TransactionsScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const styles = createTransactionsStyles(colors);
  const [filter, setFilter] = useState<TransactionFilter>("ALL");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const { transactions, loading, error, reload } = useTransactions(filter);
  const visibleTransactions = useMemo(
    () => transactions.slice(0, visibleCount),
    [transactions, visibleCount],
  );

  const changeFilter = (nextFilter: TransactionFilter) => {
    setFilter(nextFilter);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          onBack={() => navigation.goBack()}
          eyebrow="Tu actividad"
          title="Movimientos"
          subtitle="Consulta cómo han cambiado tus puntos."
        />

        <View style={styles.filters}>
          {filters.map((item) => {
            const isActive = item.value === filter;

            return (
              <Pressable
                key={item.value}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
                accessibilityLabel={`Filtrar por ${item.label}`}
                onPress={() => changeFilter(item.value)}
                style={[styles.filter, isActive && styles.activeFilter]}
              >
                <Text style={[styles.filterText, isActive && styles.activeFilterText]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {loading && (
          <View accessibilityLiveRegion="polite" style={styles.loading}>
            <ActivityIndicator color={colors.primary} size="large" />
            <Text style={styles.stateText}>Cargando tus movimientos...</Text>
          </View>
        )}

        {!loading && error && (
          <View style={styles.loading}>
            <Ionicons color={colors.error} name="cloud-offline-outline" size={40} />
            <Text style={styles.stateText}>
              No pudimos cargar tus movimientos. Revisa tu conexión e inténtalo de
              nuevo.
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Reintentar cargar movimientos"
              onPress={reload}
              style={styles.moreButton}
            >
              <Text style={styles.moreText}>Reintentar</Text>
            </Pressable>
          </View>
        )}

        {!loading && !error && transactions.length === 0 && (
          <View style={styles.loading}>
            <Ionicons color={colors.textMuted} name="receipt-outline" size={40} />
            <Text style={styles.stateText}>
              Todavía no tienes movimientos para este filtro.
            </Text>
          </View>
        )}

        {!loading && !error && transactions.length > 0 && (
          <>
            <View style={styles.transactionList}>
              {visibleTransactions.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  colors={colors}
                  styles={styles}
                  transaction={transaction}
                />
              ))}
            </View>

            {visibleCount < transactions.length && (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Ver más movimientos"
                onPress={() => setVisibleCount((current) => current + PAGE_SIZE)}
                style={styles.moreButton}
              >
                <Text style={styles.moreText}>Ver más movimientos</Text>
              </Pressable>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function TransactionCard({
  colors,
  styles,
  transaction,
}: {
  colors: ReturnType<typeof useTheme>["colors"];
  styles: ReturnType<typeof createTransactionsStyles>;
  transaction: TransactionRecord;
}) {
  const isAccumulation = transaction.type === "ACUM";
  const formattedDate = new Date(transaction.createdAt).toLocaleString("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <View style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <View style={styles.transactionType}>
          <View style={styles.transactionIcon}>
            <Ionicons
              color={isAccumulation ? colors.success : colors.accent}
              name={isAccumulation ? "arrow-down-outline" : "arrow-up-outline"}
              size={19}
            />
          </View>
          <Text style={styles.transactionTitle}>
            {isAccumulation ? "Acumulación" : "Redención"}
          </Text>
        </View>
        <Text
          style={[styles.points, isAccumulation ? styles.positive : styles.negative]}
        >
          {isAccumulation ? "+" : "-"}
          {transaction.points.toLocaleString("es-CO")} pts
        </Text>
      </View>
      <Text style={styles.reference}>{transaction.reference}</Text>
      <Text style={styles.details}>
        {transaction.partnerCode} · {transaction.locationCode}
      </Text>
      <Text style={styles.details}>{formattedDate}</Text>
    </View>
  );
}
