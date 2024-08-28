import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PrivacyPolicyScreen = ({ navigation }) => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = async () => {
    try {
      await AsyncStorage.setItem("policyAccepted", "true");
      navigation.replace("HomeUi");
    } catch (error) {
      console.error("Error saving acceptance:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}>
        <Text style={styles.title}>Política de Privacidad</Text>
        <Text style={styles.text}>
          {/* Aquí puedes poner el texto completo de tu política de privacidad */}
          Esta es la política de privacidad de nuestra aplicación, Mbolo-app.
          Por favor, léela cuidadosamente antes de continuar.
          {"\n\n"}1. **Recopilación de Información**: Recopilamos información
          que nos proporcionas directamente cuando te registras en nuestra
          aplicación, como tu nombre, dirección de correo electrónico, número de
          teléfono, y cualquier otra información que decidas proporcionar.
          Además, recopilamos información automáticamente sobre tu dispositivo y
          el uso de nuestra aplicación, como tu dirección IP, tipo de
          dispositivo, identificadores únicos de dispositivo y datos de
          navegación.
          {"\n\n"}2. **Uso de la Información**: Utilizamos la información
          recopilada para proporcionarte nuestros servicios, mejorar y
          personalizar tu experiencia con la aplicación, comunicarnos contigo, y
          para fines de seguridad y protección. También podemos utilizar tu
          información para enviarte notificaciones y actualizaciones
          relacionadas con nuestros servicios.
          {"\n\n"}3. **Compartición de Información**: No compartimos tu
          información personal con terceros, excepto en los siguientes casos:
          cuando contamos con tu consentimiento, para cumplir con leyes y
          regulaciones, para proteger nuestros derechos y propiedades, y para
          cumplir con las operaciones de nuestra aplicación a través de
          proveedores de servicios de confianza.
          {"\n\n"}4. **Seguridad de la Información**: Implementamos medidas de
          seguridad razonables para proteger tu información personal contra
          accesos no autorizados, alteraciones, divulgación o destrucción. Sin
          embargo, ningún método de transmisión por Internet o almacenamiento
          electrónico es 100% seguro, por lo que no podemos garantizar su
          seguridad absoluta.
          {"\n\n"}5. **Tus Derechos**: Tienes el derecho de acceder, corregir,
          actualizar o solicitar la eliminación de tu información personal.
          Puedes hacerlo directamente desde la configuración de tu cuenta en
          nuestra aplicación o contactándonos a través de los medios
          proporcionados en esta política de privacidad.
          {"\n\n"}6. **Cambios a esta Política de Privacidad**: Podemos
          actualizar nuestra política de privacidad ocasionalmente para reflejar
          cambios en nuestras prácticas o por razones operativas, legales o
          regulatorias. Te notificaremos cualquier cambio publicando la nueva
          política de privacidad en esta página. Te recomendamos revisar esta
          política periódicamente para estar informado sobre cómo protegemos tu
          información.
          {"\n\n"}7. **Contacto**: Si tienes alguna pregunta o inquietud sobre
          nuestra política de privacidad, no dudes en contactarnos a través de
          [tu dirección de correo electrónico o número de contacto].
          {"\n\n"}Al utilizar nuestra aplicación, aceptas los términos de esta
          política de privacidad.
        </Text>
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, accepted && styles.buttonDisabled]}
        onPress={handleAccept}
        disabled={accepted}>
        <Text style={styles.buttonText}>Aceptar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: "justify",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  buttonDisabled: {
    backgroundColor: "#d3d3d3",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PrivacyPolicyScreen;
