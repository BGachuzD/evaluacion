import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../navigation/types';
import { formatCurrency } from '../utils/formatCurrency';

type Props = NativeStackScreenProps<RootStackParamList, 'AccountDetail'>;

export function AccountDetail({ route }: Props) {
  const { account } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <DetailRow label="Número" value={account.number} />
        <DetailRow label="Tipo" value={account.type} />
        <DetailRow label="Saldo" value={formatCurrency(account.balance)} />
      </View>
    </View>
  );
}

interface DetailRowProps {
  label: string;
  value: string;
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 18,
  },
  row: {
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 18,
  },
  label: {
    color: '#6B7280',
    fontSize: 13,
  },
  value: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
});
