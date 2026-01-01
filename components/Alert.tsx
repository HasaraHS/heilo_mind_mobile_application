import { Modal, StyleSheet, View, Pressable } from "react-native";
import Typo from "@/components/Typo";
import { colors, spacingY, spacingX } from "@/constants/theme";
import * as Icon from "phosphor-react-native";

interface CreativeAlertProps {
  visible: boolean;
  title: string;
  message: string;
  type?: "success" | "error" | "info";
  onHide: () => void;
}

const CreativeAlert = ({
  visible,
  title,
  message,
  type = "info",
  onHide,
}: CreativeAlertProps) => {
  const iconConfig = {
    success: { icon: Icon.CheckCircle, color: colors.success },
    error: { icon: Icon.XCircle, color: colors.error },
    info: { icon: Icon.Info, color: colors.buttonSecondary },
  };

  const AlertIcon = iconConfig[type].icon;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <AlertIcon size={60} color={iconConfig[type].color} />

          <Typo size={18} fontWeight="700" style={styles.title}>
            {title}
          </Typo>

          <Typo size={15} color={colors.textSecondary} style={styles.message}>
            {message}
          </Typo>

          <Pressable style={styles.button} onPress={onHide}>
            <Typo size={16} color={colors.background} fontWeight="600">
              OK
            </Typo>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default CreativeAlert;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "85%",
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: spacingX._20,
    alignItems: "center",
    gap: spacingY._15,
  },
  title: {
    marginTop: spacingY._10,
  },
  message: {
    textAlign: "center",
  },
  button: {
    marginTop: spacingY._10,
    backgroundColor: colors.primary,
    paddingVertical: spacingY._10,
    paddingHorizontal: spacingX._30,
    borderRadius: 12,
  },
});
