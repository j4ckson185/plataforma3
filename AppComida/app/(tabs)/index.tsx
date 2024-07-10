import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

import Colors from "@/constants/Colors";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { APP_MODE, APP_MODE_OPTIONS } from "@/config/config";
import EstablishmentView from "@/components/EstablishmentView";
import Establishment from "../establishment";
import { useCartApi } from "@/contexts/ApiCartContext";

import { View } from "@/components/Themed";
import Texts from "@/constants/Texts";
import establishmentsModel from "@/services/establishments.model";

export default function index() {
  return (
    <>{APP_MODE == APP_MODE_OPTIONS.unique ? <Establishment /> : TabTwo()}</>
  );
}

function TabTwo() {
  const { setEstablishment, cleanCart } = useCartApi();
  const nav = useNavigation();
  const isFocused = useIsFocused();

  const [estabelecimentos, setEstabelecimentos] = useState([]);

  async function init() {
    const resp = await establishmentsModel.getEstablishment();
    setEstabelecimentos(resp);
  }

  useEffect(() => {
    if (isFocused) {
      cleanCart();
    }
  }, [isFocused]);

  useEffect(() => {
    init();
  }, []);

  return (
    <ScrollView
      style={{
        backgroundColor: Colors.light.background,
        paddingTop: 10,
      }}
      showsVerticalScrollIndicator={false}
    >
      {estabelecimentos.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.conttexts}>
            {Texts.nenhum_estabelecimento_aberto}
          </Text>
        </View>
      ) : null}
      {estabelecimentos.map((e) => (
        <EstablishmentView
          item={e}
          onPress={() => {
            setEstablishment(e);
            nav.navigate("establishment");
          }}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "20%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  conttexts: {
    fontSize: 14,
    fontWeight: "300",
  },
});
