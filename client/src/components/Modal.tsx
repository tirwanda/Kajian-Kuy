import React from 'react';
import {
  StyleSheet,
  Modal as RNModal,
  ViewStyle,
  Platform,
  Pressable,
  View,
} from 'react-native';

import {useData, useTheme} from '../hooks';
import {IModalProps} from '../constants/types';

import Block from './Block';

const Modal = ({
  id = 'Modal',
  children,
  style,
  onRequestClose,
  ...props
}: IModalProps) => {
  const {colors, sizes} = useTheme();
  const modalStyles = StyleSheet.flatten([style, {}]) as ViewStyle;
  const {isDark} = useData();
  const {setModalChannel} = useData();

  // generate component testID or accessibilityLabel based on Platform.OS
  const modalID =
    Platform.OS === 'android' ? {accessibilityLabel: id} : {testID: id};
  const styles = StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    divider: {
      borderBottomWidth: 4,
      borderBottomColor: isDark ? colors.white : colors.dark,
      width: 40,
      alignSelf: 'center',
      borderRadius: 4,
    },
  });

  return (
    <RNModal
      {...modalID}
      {...props}
      transparent
      style={modalStyles}
      animationType="slide"
      onRequestClose={onRequestClose}>
      <Pressable onPress={() => setModalChannel(false)} style={styles.overlay}>
        <Block justify="flex-end">
          <Block
            safe
            card
            flex={0}
            color={isDark ? colors.dark : colors.light}
            style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
            <View style={styles.divider} />
            <Block
              flex={0}
              marginTop={sizes.sm}
              paddingHorizontal={sizes.padding}>
              {children}
            </Block>
          </Block>
        </Block>
      </Pressable>
    </RNModal>
  );
};

export default React.memo(Modal);
