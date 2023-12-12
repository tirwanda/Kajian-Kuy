import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Text from './Text';
import {useTheme} from '../hooks';
import Button from './Button';
import {
  MessageTypes,
  MessageIconType,
  IMessageModalProps,
} from '../constants/types';

const MessageModal = ({
  messageModalVisible,
  messageType,
  headerText = 'Header',
  messageText = '',
  onDismiss,
  onProceed,
  onReject,
  isLoading,
  isProcesing,
}: IMessageModalProps) => {
  const {colors, sizes} = useTheme();

  let messageIconName: MessageIconType,
    messageThemeColor = colors.primary;

  switch (messageType) {
    case MessageTypes.FAIL:
      messageIconName = 'close';
      messageThemeColor = colors.danger;
      break;
    case MessageTypes.SUCCESS:
      messageIconName = 'check';
      messageThemeColor = colors.success;
      break;
    case MessageTypes.DECISION:
      messageIconName = 'alert-circle-check-outline';
      messageThemeColor = colors.success;
      break;
    case MessageTypes.WARNING:
      messageIconName = 'alert-circle-outline';
      messageThemeColor = colors.warning;
      break;
    case MessageTypes.DANGEROUS_DECISION:
      messageIconName = 'alert-circle-outline';
      messageThemeColor = colors.danger;
      break;
    default:
      messageIconName = 'information-variant';
      messageThemeColor = colors.secondary;
      break;
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 25,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.7)',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    modalView: {
      backgroundColor: colors.white,
      width: '100%',
      alignItems: 'center',
      paddingTop: 45,
      borderRadius: 15,
      elevation: 5,
      shadowColor: colors.black,
      shadowOpacity: 0.25,
      shadowRadius: 5,
      shadowOffset: {width: 0, height: 2},
      margin: 'auto',
    },

    modalIcon: {
      backgroundColor: colors.gray,
      height: 100,
      width: 100,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: -50,
      elevation: 5,
      shadowColor: colors.black,
      shadowOpacity: 0.25,
      shadowRadius: 5,
      shadowOffset: {width: 0, height: 2},
    },

    modalContent: {
      width: '100%',
      alignItems: 'center',
      padding: 20,
    },
    decisionRow: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
  });

  return (
    <Modal
      animationType="fade"
      visible={messageModalVisible}
      transparent={true}
      style={{height: '100%'}}>
      <Pressable onPress={onDismiss} style={styles.container}>
        {isLoading && <ActivityIndicator size={70} color={colors.white} />}
        {!isLoading && (
          <View style={styles.modalView}>
            <View
              style={[styles.modalIcon, {backgroundColor: messageThemeColor}]}>
              <MaterialCommunityIcons
                name={messageIconName}
                size={75}
                color={colors.white}
              />
            </View>
            <View style={styles.modalContent}>
              <Text p bold center marginBottom={sizes.s} transform="uppercase">
                {headerText}
              </Text>
              <Text p semibold center marginBottom={sizes.sm}>
                {messageText}
              </Text>
              {messageType === MessageTypes.DECISION ||
              messageType === MessageTypes.DANGEROUS_DECISION ? (
                <View style={styles.decisionRow}>
                  <Button
                    disabled={isProcesing}
                    onPress={onProceed}
                    color={messageThemeColor}
                    width={'48%'}
                    paddingHorizontal={sizes.xl}>
                    <MaterialCommunityIcons
                      name="check"
                      size={15}
                      color={colors.white}
                    />
                  </Button>
                  <Button
                    disabled={isProcesing}
                    secondary
                    width={'48%'}
                    paddingHorizontal={sizes.xl}
                    onPress={onReject}>
                    <MaterialCommunityIcons
                      name="close"
                      size={15}
                      color={colors.white}
                    />
                  </Button>
                </View>
              ) : (
                <Button
                  disabled={isProcesing}
                  onPress={onReject}
                  color={messageThemeColor}
                  width={'100%'}
                  paddingHorizontal={sizes.xl}>
                  <MaterialCommunityIcons
                    name="check"
                    size={15}
                    color={colors.white}
                  />
                </Button>
              )}
            </View>
          </View>
        )}
      </Pressable>
    </Modal>
  );
};

export default MessageModal;
