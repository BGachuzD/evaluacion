import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Account } from '../models/Account';
import { formatCurrency } from '../utils/formatCurrency';

interface AccountCardProps {
  account: Account;
  onPress: (account: Account) => void;
}

function AccountCardComponent({ account, onPress }: AccountCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Abrir ${account.type} ${account.number}`}
      onPress={() => onPress(account)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.headerRow}>
        <Text style={styles.type}>{account.type}</Text>
        <Text style={styles.chevron}>›</Text>
      </View>

      <Text style={styles.number}>Numero {account.number}</Text>
      <Text style={styles.label}>Saldo disponible</Text>
      <Text style={styles.balance}>{formatCurrency(account.balance)}</Text>
    </Pressable>
  );
}

export const AccountCard = memo(AccountCardComponent);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  pressed: {
    opacity: 0.75,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  type: {
    color: '#111827',
    fontSize: 17,
    fontWeight: '700',
  },
  chevron: {
    color: '#6B7280',
    fontSize: 28,
  },
  number: {
    color: '#6B7280',
    fontSize: 14,
    marginTop: 6,
  },
  label: {
    color: '#6B7280',
    fontSize: 13,
    marginTop: 20,
  },
  balance: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 2,
  },
});
