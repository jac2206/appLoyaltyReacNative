import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ContentState } from "../components/ContentState";
import { CustomButton } from "../components/CustomButtom";
import { ScreenHeader } from "../components/ScreenHeader";
import { ScreenLayout } from "../components/ScreenLayout";
import { useTheme } from "../context/ThemeContext";
import { type TransactionFilter, useTransactions } from "../hooks/useTransactions";
import { createTransactionsStyles } from "../styles/transactions.styles";
import type { MainStackParamList } from "../types/navigation";
import type { TransactionRecord } from "../types/transaction";

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
    <ScreenLayout>
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
        <ContentState
          loading
          title="Cargando movimientos"
          message="Estamos consultando tu actividad."
        />
      )}

      {!loading && error && (
        <ContentState
          icon="cloud-offline-outline"
          title="No pudimos cargar tu actividad"
          message="Revisa tu conexión e inténtalo nuevamente."
          action={{ label: "Reintentar", onPress: reload }}
        />
      )}

      {!loading && !error && transactions.length === 0 && (
        <ContentState
          title="Aún no hay movimientos"
          message="Cuando tengas operaciones de este tipo, las encontrarás aquí."
        />
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
            <CustomButton
              title="Ver más movimientos"
              variant="outline"
              icon="chevron-down-outline"
              onPress={() => setVisibleCount((current) => current + PAGE_SIZE)}
            />
          )}
        </>
      )}
    </ScreenLayout>
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
              color={isAccumulation ? colors.success : colors.primaryText}
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
