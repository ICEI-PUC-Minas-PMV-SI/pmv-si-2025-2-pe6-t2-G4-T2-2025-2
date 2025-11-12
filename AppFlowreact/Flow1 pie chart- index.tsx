import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width * 0.95;

type Lancamento = {
  id: string;
  descricao: string;
  valor: number;
  tipo: 'entrada' | 'saida';
};

type User = {
  username: string;
  password: string;
};

export default function App() {
  // Controle simples de usuários cadastrados (em memória)
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Estado para modo cadastro ou login
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // lançamentos e edição
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState<'entrada' | 'saida'>('entrada');
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  // Login / Cadastro
  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Erro', 'Preencha usuário e senha!');
      return;
    }
    const foundUser = users.find((u) => u.username === username && u.password === password);
    if (foundUser) {
      setIsLoggedIn(true);
      limparFormulario();
    } else {
      Alert.alert('Erro', 'Usuário ou senha incorretos!');
    }
  };

  const handleRegister = () => {
    if (!username || !password) {
      Alert.alert('Erro', 'Preencha usuário e senha para cadastro!');
      return;
    }
    const userExists = users.some((u) => u.username === username);
    if (userExists) {
      Alert.alert('Erro', 'Usuário já existe!');
      return;
    }
    setUsers((prev) => [...prev, { username, password }]);
    Alert.alert('Sucesso', 'Usuário cadastrado! Agora faça login.');
    setIsRegisterMode(false);
    setUsername('');
    setPassword('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setLancamentos([]);
    setEditId(null);
  };

  // Função para limpar campos do formulário de lançamento
  const limparFormulario = () => {
    setDescricao('');
    setValor('');
    setTipo('entrada');
    setEditId(null);
  };

  // Adicionar ou editar lançamento
  const adicionarOuEditarLancamento = () => {
    if (!descricao.trim() || !valor.trim()) {
      Alert.alert('Erro', 'Preencha descrição e valor!');
      return;
    }
    const valorNum = parseFloat(valor.replace(',', '.'));
    if (isNaN(valorNum) || valorNum <= 0) {
      Alert.alert('Erro', 'Valor inválido!');
      return;
    }
    if (editId) {
      // Editar lançamento existente
      setLancamentos((prev) =>
        prev.map((l) =>
          l.id === editId ? { ...l, descricao: descricao.trim(), valor: valorNum, tipo } : l
        )
      );
      limparFormulario();
    } else {
      // Adicionar novo
      const novoLancamento: Lancamento = {
        id: Math.random().toString(36).substr(2, 9),
        descricao: descricao.trim(),
        valor: valorNum,
        tipo,
      };
      setLancamentos((prev) => [novoLancamento, ...prev]);
      limparFormulario();
    }
  };

  // Excluir lançamento com confirmação
  const deletarLancamento = (id: string) => {
    Alert.alert('Confirmação', 'Deseja excluir esse lançamento?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => setLancamentos((prev) => prev.filter((l) => l.id !== id)),
      },
    ]);
  };

  // Editar lançamento: preencher formulário
  const editarLancamento = (item: Lancamento) => {
    setDescricao(item.descricao);
    setValor(item.valor.toString().replace('.', ','));
    setTipo(item.tipo);
    setEditId(item.id);
  };

  // cálculo resumo
  const totalEntradas = lancamentos
    .filter((l) => l.tipo === 'entrada')
    .reduce((acc, cur) => acc + cur.valor, 0);
  const totalSaidas = lancamentos
    .filter((l) => l.tipo === 'saida')
    .reduce((acc, cur) => acc + cur.valor, 0);
  const saldo = totalEntradas - totalSaidas;

  const pieData = [
    {
      name: 'Entradas',
      amount: totalEntradas,
      color: '#4CAF50',
      legendFontColor: '#333',
      legendFontSize: 16,
    },
    {
      name: 'Saídas',
      amount: totalSaidas,
      color: '#E74C3C',
      legendFontColor: '#333',
      legendFontSize: 16,
    },
  ].filter((item) => item.amount > 0);

  // Renderização item da lista
  const renderItem = ({ item }: { item: Lancamento }) => (
    <View style={styles.lancamentoItem}>
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.lancamentoDescricao,
            item.tipo === 'saida' && { color: '#E74C3C' },
          ]}
        >
          {item.descricao}
        </Text>
        <Text
          style={[
            styles.lancamentoValor,
            item.tipo === 'saida' && { color: '#E74C3C' },
          ]}
        >
          {item.tipo === 'saida' ? '- ' : ''}
          R$ {item.valor.toFixed(2).replace('.', ',')}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => editarLancamento(item)}
        style={[styles.botaoAcao, { marginRight: 10 }]}
      >
        <Text style={{ color: '#4CAF50', fontWeight: 'bold', fontSize: 20 }}>
          ✏️
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => deletarLancamento(item.id)}
        style={styles.botaoAcao}
      >
        <Text style={{ color: '#E74C3C', fontWeight: 'bold', fontSize: 20 }}>
          🗑️
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          {!isLoggedIn ? (
            <>
              <Text style={styles.logoText}>Bem Vindo ao Flow</Text>
              <View style={styles.loginForm}>
                <TextInput
                  style={styles.input}
                  placeholder="Usuário"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />

                {isRegisterMode ? (
                  <>
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: '#4CAF50' }]}
                      onPress={handleRegister}
                    >
                      <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: '#E74C3C', marginTop: 10 }]}
                      onPress={() => setIsRegisterMode(false)}
                    >
                      <Text style={styles.buttonText}>Voltar para Login</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleLogin}
                    >
                      <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: '#4CAF50', marginTop: 10 }]}
                      onPress={() => setIsRegisterMode(true)}
                    >
                      <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </>
          ) : (
            <>
              <Text style={styles.logoText}>Flow</Text>

              {/* Formulário */}
              <TextInput
                style={styles.input}
                placeholder="Descrição"
                value={descricao}
                onChangeText={setDescricao}
              />
              <TextInput
                style={styles.input}
                placeholder="Valor (R$)"
                keyboardType="numeric"
                value={valor}
                onChangeText={setValor}
              />

              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={tipo}
                  onValueChange={(itemValue) => setTipo(itemValue as 'entrada' | 'saida')}
                  style={styles.picker}
                >
                  <Picker.Item label="Entrada" value="entrada" />
                  <Picker.Item label="Saída" value="saida" />
                </Picker>
              </View>

              <TouchableOpacity
                style={[
                  styles.buttonAdd,
                  editId ? { backgroundColor: '#4CAF50' } : { backgroundColor: '#000' },
                ]}
                onPress={adicionarOuEditarLancamento}
              >
                <Text style={styles.buttonText}>
                  {editId ? 'Salvar Alteração' : 'Adicionar'}
                </Text>
              </TouchableOpacity>

              {/* Lista lançamentos */}
              <FlatList
                data={lancamentos}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                style={{ marginTop: 20, maxHeight: 220 }}
              />

              {/* Resumo */}
              <View style={styles.resumoContainer}>
                <View style={styles.resumoBox}>
                  <Text style={styles.resumoLabel}>Entradas</Text>
                  <Text style={styles.resumoValor}>
                    R$ {totalEntradas.toFixed(2).replace('.', ',')}
                  </Text>
                </View>
                <View style={styles.resumoBox}>
                  <Text style={styles.resumoLabel}>Saídas</Text>
                  <Text style={styles.resumoValor}>
                    R$ {totalSaidas.toFixed(2).replace('.', ',')}
                  </Text>
                </View>
                <View style={styles.resumoBox}>
                  <Text style={styles.resumoLabel}>Saldo</Text>
                  <Text
                    style={[
                      styles.resumoValor,
                      saldo < 0 ? { color: '#E74C3C' } : { color: '#4CAF50' },
                    ]}
                  >
                    R$ {saldo.toFixed(2).replace('.', ',')}
                  </Text>
                </View>
              </View>

                {/* Gráfico */}
              {pieData.length > 0 && (
                <PieChart
                  data={pieData}
                  width={screenWidth}
                  height={220}
                  chartConfig={{
                    color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                    labelColor: () =>'#000',
                  }}
                  accessor="amount"
                  backgroundColor="transparent"
                  paddingLeft="600"
                  hasLegend={false} // ❌ Esconde legenda padrão
      center={[0, 0]}
      style={{ alignSelf: 'center' }}
                />
              )}

              <TouchableOpacity
                style={[styles.button, { backgroundColor: 'rgba(20, 19, 19, 1)', marginTop: 20 }]}
                onPress={handleLogout}
              >
                <Text style={styles.buttonText}>Sair</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  container: {
    width: 450,
    maxWidth: '95%',
    backgroundColor: '#293605ff',
    borderRadius: 10,
    padding: 15,
    elevation: 10,
    height:750,
  },
  logoText: {
    color: 'rgba(226, 250, 8, 1)',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'sans-serif-condensed',
  },
  loginForm: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#ffffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 18,
    marginBottom: 10,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  picker: {
    height: 45,
  },
  button: {
    backgroundColor: '#E74C3C',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 5,
  },
  buttonAdd: {
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 5,
    color: '#0d4d07ff',
  },
  buttonText: {
    color: 'rgba(240, 225, 18, 1)',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  lancamentoItem: {
    flexDirection: 'row',
    backgroundColor: '#222222ff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  lancamentoDescricao: {
    fontSize: 18,
    color: '#fff',
  },
  lancamentoValor: {
    fontSize: 18,
    marginTop: 4,
    color: '#4CAF50',
  },
  botaoAcao: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  resumoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    backgroundColor: '#111',
    borderRadius: 8,
    paddingVertical: 15,
  },
  resumoBox: {
    alignItems: 'center',
    flex: 1,
  },
  resumoLabel: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 4,
  },
  resumoValor: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  graficoContainer: {
  alignItems: 'center',
  marginTop: 25,
  marginBottom: 10,
  backgroundColor: '#111',
  borderRadius: 12,
  paddingVertical: 10,
},
legendaContainer: {
  marginTop: 15,
  width: '100%',
  alignItems: 'center',
},
legendaItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 4,
},
legendaCor: {
  width: 18,
  height: 18,
  borderRadius: 4,
  marginRight: 8,
},
legendaTexto: {
  color: '#fff',
  fontSize: 18,
  fontWeight: '500',
},

});
