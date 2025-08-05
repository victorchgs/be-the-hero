import { Feather } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { formatCurrency } from "react-native-format-currency";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import api from "@/services/api";
import styles from "@/styles/Detail/styles";
import { Incident } from "@/types/incident";

export default function Detail() {
  const [incident, setIncident] = useState<Incident | null>(null);

  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const logoImg = require("@/assets/images/logo.png");
  const message = `Olá ${
    incident?.name
  }, estou entrando em contato pois gostaria de ajudar no caso "${
    incident?.title
  }" com o valor de ${
    formatCurrency({ amount: incident?.value || 0, code: "BRL" })[0]
  }`;

  function navigateBack() {
    router.back();
  }

  function sendMail() {
    if (incident) {
      MailComposer.composeAsync({
        subject: `Herói do caso: ${incident?.title}`,
        recipients: [incident?.email],
        body: message,
      });
    }
  }

  function sendWhatsApp() {
    Linking.openURL(
      `whatsapp://send?phone=${incident?.whatsapp}&text=${message}`
    );
  }

  useEffect(() => {
    async function loadIncident() {
      const response = await api.get(`/incidents`);

      const incident = response.data.find(
        (incident: Incident) => String(incident.id) === id
      );

      setIncident(incident);
    }

    loadIncident();
  }, [id]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e02041" />
        </TouchableOpacity>
      </View>
      {incident ? (
        <>
          <View style={styles.incident}>
            <Text style={[styles.incidentProperty, { marginTop: 0 }]}>
              ONG:
            </Text>
            <Text style={styles.incidentValue}>
              {incident.name} de {incident.city}-{incident.uf}
            </Text>
            <Text style={styles.incidentProperty}>Caso:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>
            <Text style={styles.incidentProperty}>Valor:</Text>
            <Text style={styles.incidentValue}>
              {formatCurrency({ amount: incident.value, code: "BRL" })[0]}
            </Text>
          </View>
          <View style={styles.contactBox}>
            <Text style={styles.heroTitle}>Salve o dia!</Text>
            <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
            <Text style={styles.heroDescription}>Entre em contato:</Text>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                <Text style={styles.actionText}>WhatsApp</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.action} onPress={sendMail}>
                <Text style={styles.actionText}>E-mail</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <Text></Text>
      )}
    </View>
  );
}
