import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { formatCurrency } from "react-native-format-currency";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import api from "@/services/api";
import styles from "@/styles/Incidents/styles";
import { Incident } from "@/types/incident";

export default function Incidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const insets = useSafeAreaInsets();
  const router = useRouter();

  const logoImg = require("@/assets/images/logo.png");

  function navigateToDetail(incident: Incident) {
    router.push({
      pathname: "/detail",
      params: { id: incident.id },
    });
  }

  const loadIncidents = useCallback(async () => {
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length === total) {
      return;
    }

    setLoading(true);

    const response = await api.get("incidents", { params: { page } });

    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers["x-total-count"]);
    setPage(page + 1);
    setLoading(false);
  }, [loading, total, incidents, page]);

  useEffect(() => {
    loadIncidents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia.
      </Text>
      {incidents ? (
        <FlatList
          data={incidents}
          keyExtractor={(incident) => String(incident.id)}
          showsVerticalScrollIndicator={true}
          onEndReached={loadIncidents}
          onEndReachedThreshold={0.2}
          renderItem={({ item: incident }) => (
            <View style={styles.incident}>
              <Text style={styles.incidentProperty}>ONG:</Text>
              <Text style={styles.incidentValue}>{incident.name}</Text>
              <Text style={styles.incidentProperty}>Caso:</Text>
              <Text style={styles.incidentValue}>{incident.title}</Text>
              <Text style={styles.incidentProperty}>Valor:</Text>
              <Text style={styles.incidentValue}>
                {formatCurrency({ amount: incident.value, code: "BRL" })[0]}
              </Text>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigateToDetail(incident)}
              >
                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                <Feather name="arrow-right" size={16} color="#e02041" />
              </TouchableOpacity>
            </View>
          )}
          style={styles.incidentList}
        />
      ) : (
        <View></View>
      )}
    </View>
  );
}
