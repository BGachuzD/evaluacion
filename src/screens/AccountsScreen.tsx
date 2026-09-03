import React, { useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AccountCard } from '../components/AccountCard';
import { ErrorView } from '../components/ErrorView';
import { LoadingView } from '../components/LoadingView';
import { useAccounts } from '../hooks/useAccounts';
import type { Account } from '../models/Account';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Accounts'>;

export function AccountsScreen({ navigation }: Props) {
  const { accounts, isLoading, isRefreshing, error, refresh, retry } =
    useAccounts();

  const handleAccountPress = useCallback(
    (account: Account) => {
      navigation.navigate('AccountDetail', { account });
    },
    [navigation],
  );

  const renderItem = useCallback<ListRenderItem<Account>>(
    ({ item }) => (
      <AccountCard account={item} onPress={handleAccountPress} />
    ),
    [handleAccountPress],
  );

  if (isLoading && accounts.length === 0) {
    return <LoadingView />;
  }

  if (error && accounts.length === 0) {
    return <ErrorView message={error} onRetry={() => void retry()} />;
  }

  return (
    <View style={styles.container}>
      {error ? (
        <Text accessibilityRole="alert" style={styles.inlineError}>
          {error}
        </Text>
      ) : null}

      <FlatList
        data={accounts}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        refreshing={isRefreshing}
        onRefresh={() => void refresh()}
        contentContainerStyle={
          accounts.length === 0 ? styles.emptyContent : styles.content
        }
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={EmptyAccounts}
        initialNumToRender={8}
        windowSize={7}
      />
    </View>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

function EmptyAccounts() {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyTitle}>No hay cuentas disponibles</Text>
      <Text style={styles.emptyText}>Desliza hacia abajo para actualizar.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    padding: 16,
  },
  emptyContent: {
    flexGrow: 1,
    padding: 16,
  },
  separator: {
    height: 12,
  },
  inlineError: {
    backgroundColor: '#FEE2E2',
    color: '#991B1B',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '700',
  },
  emptyText: {
    color: '#6B7280',
    marginTop: 6,
  },
});
