import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width * 0.6;
const chartWidth = Math.max(12 * 60, screenWidth);

const meses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

export default function App() {
  // Estados de login/cadastro
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [users, setUsers] = useState<{ username: string; password: string }[]>([]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Estados de finanças
  const [mesSelecionado, setMesSelecionado] = useState('Janeiro');
  const [dados, setDados] = useState<any>({});
  const [total, setTotal] = useState<number | null>(null);

  const atualizarCategoria = (campo: string, valor: string) => {
    setDados((prev: any) => ({
      ...prev,
      [mesSelecionado]: {
        ...prev[mesSelecionado],
        [campo]: valor,
      },
    }));
  };

  const calcularTotal = () => {
    const valores = dados[mesSelecionado] || {};
    const receita = parseFloat(valores.recebimento) || 0;
    const despesas =
      (parseFloat(valores.alimentacao) || 0) +
      (parseFloat(valores.transporte) || 0) +
      (parseFloat(valores.lazer) || 0) +
      (parseFloat(valores.outras) || 0);
    setTotal(receita - despesas);
  };

  const limparCampos = () => {
    setDados((prev: any) => ({
      ...prev,
      [mesSelecionado]: {
        recebimento: '',
        alimentacao: '',
        transporte: '',
        lazer: '',
        outras: '',
      },
    }));
    setTotal(null);
  };

  // Função de login
  const handleLogin = () => {
    const userExists = users.find(
      (u) => u.username === username && u.password === password
    );
    if (userExists) {
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
    } else {
      alert('Usuário ou senha incorretos!');
    }
  };

  // Função de cadastro
  const handleRegister = () => {
    if (!username || !password) {
      alert('Preencha usuário e senha!');
      return;
    }
    const userExists = users.find((u) => u.username === username);
    if (userExists) {
      alert('Usuário já existe!');
      return;
    }
    setUsers([...users, { username, password }]);
    alert('Cadastro realizado com sucesso!');
    setIsRegistering(false);
    setUsername('');
    setPassword('');
  };

  // Função de logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const valoresMes = dados[mesSelecionado] || {};
  const receitas = meses.map((mes) => parseFloat(dados[mes]?.recebimento) || 0);
  const despesas = meses.map((mes) =>
    ['alimentacao', 'transporte', 'lazer', 'outras'].reduce(
      (acc, cat) => acc + (parseFloat(dados[mes]?.[cat]) || 0),
      0
    )
  );

  return (
 <ImageBackground
  source={require('../../assets/images/logo.png')}
  style={{
    width:1900,
    height: 600,          // ajuste a altura
    justifyContent: 'center', // centraliza verticalmente os filhos
    alignItems: 'center',     // centraliza horizontalmente os filhos
    
  }}
  resizeMode="contain"  // mantém a imagem inteira, sem cortar
>
      
    
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          {!isLoggedIn ? (
            <>
              <Text style={styles.headerTitle}>
                {isRegistering ? 'Cadastro' : 'Bem-vindo ao FLOW'}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Usuário"
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={isRegistering ? handleRegister : handleLogin}
              >
                <Text style={styles.buttonText}>
                  {isRegistering ? 'Cadastrar' : 'Login'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
                <Text style={{ textAlign: 'center', marginTop: 12, color: 'rgba(251, 255, 0, 1)' }}>
                  {isRegistering
                    ? 'Já tem conta? Faça login'
                    : 'Não tem conta? Cadastre-se'}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* Tela principal */}
              <Image
             
                
              />
              <Text style={styles.title}>FLOW</Text>
              <Text style={styles.subtitle}>Finanças</Text>

              <Text style={styles.label}>Selecione o mês:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={mesSelecionado}
                  onValueChange={setMesSelecionado}
                  style={styles.picker}
                  itemStyle={{ fontSize:23 }}>
                  {meses.map((mes) => (
                    <Picker.Item key={mes} label={mes} value={mes} />
                  ))}
                </Picker>
              </View>

              {/* Entradas de valores */}
              <TextInput
                style={styles.input}
                placeholder="Recebimento"
                keyboardType="numeric"
                value={valoresMes.recebimento || ''}
                onChangeText={(v) => atualizarCategoria('recebimento', v)}
              />
              <TextInput
                style={styles.input}
                placeholder="Alimentação"
                keyboardType="numeric"
                value={valoresMes.alimentacao || ''}
                onChangeText={(v) => atualizarCategoria('alimentacao', v)}
              />
              <TextInput
                style={styles.input}
                placeholder="Transporte"
                keyboardType="numeric"
                value={valoresMes.transporte || ''}
                onChangeText={(v) => atualizarCategoria('transporte', v)}
              />
              <TextInput
                style={styles.input}
                placeholder="Lazer"
                keyboardType="numeric"
                value={valoresMes.lazer || ''}
                onChangeText={(v) => atualizarCategoria('lazer', v)}
              />
              <TextInput
                style={styles.input}
                placeholder="Outras despesas"
                keyboardType="numeric"
                value={valoresMes.outras || ''}
                onChangeText={(v) => atualizarCategoria('outras', v)}
              />

              <TouchableOpacity style={styles.buttonContainer} onPress={calcularTotal}>
                <Text style={styles.buttonText}>Calcular Total</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.buttonContainer, { backgroundColor: '#75d30bff' }]}
                onPress={limparCampos}
              >
                <Text style={styles.buttonText}>Limpar Campos</Text>
              </TouchableOpacity>

              {total !== null && (
                <Text style={styles.result}>
                  Saldo: R$ {total.toFixed(2).replace('.', ',')}
                </Text>
              )}

              <Text style={styles.chartLabel}>Receitas (últimos meses)</Text>
              <ScrollView horizontal>
                <BarChart
                    data={{ labels: meses, datasets: [{ data: receitas }] }}
                    width={chartWidth}
                    height={320}
                    yAxisLabel="R$ "
                    chartConfig={chartConfig}
                    style={styles.chart} yAxisSuffix={''}                />
              </ScrollView>

              <Text style={styles.chartLabel}>Despesas (últimos meses)</Text>
              <ScrollView horizontal>
                <BarChart
                    data={{ labels: meses, datasets: [{ data: despesas }] }}
                    width={chartWidth}
                    height={320}
                    yAxisLabel="R$ "
                   
                    chartConfig={chartConfig}
                    style={styles.chart} yAxisSuffix={''}                />
              </ScrollView>

              <TouchableOpacity
                style={[styles.buttonContainer, { backgroundColor: '#faf606ff' }]}
                onPress={handleLogout}
              >
                <Text style={styles.buttonText}>Sair</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const chartConfig = {
  backgroundGradientFrom: 'rgba(255, 255, 251, 0.99)',
  backgroundGradientTo: 'rgba(255, 255, 255, 1)',
  decimalPlaces: 2,
  color: () => 'rgba(6, 248, 6, 1)' ,
  labelColor: () =>'rgba(15, 15, 15, 1)' ,
  style: { borderRadius:10 },
propsForLabels: { fontSize: 18 ,dx:32,},

};

const styles = StyleSheet.create({
  background: { flex: 1 },
  scroll: { flexGrow: 1, alignItems: 'center', justifyContent: 'center' },
  container: {
    width: 410,
    maxWidth: '100%',
    fontSize:23,
    padding:5,
    borderRadius: 20,
    backgroundColor: 'rgba(14, 233, 113, 0.07)',
    ...Platform.select({ web: { boxShadow: '0 9px 20px rgba(0, 0, 0, 0.91)' }, default: { elevation: 8 } }),
  },
  headerTitle: { color:'rgba(251, 255, 11, 1)',fontSize:45, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  logo: { width: 100, height: 100, alignSelf: 'center', marginBottom: 16 },
  title: { fontSize: 45, fontWeight: 'bold', marginBottom: 24, textAlign: 'center',color:'rgba(245, 241, 5, 1)' },
  subtitle: { fontSize: 23, textAlign: 'center', color: 'rgba(245, 241, 5, 1)', marginBottom: 20 },
  input: {
    height: 45,
    borderColor: '#e4f1efff',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 14,
    borderRadius: 8,
    fontSize: 23,
    backgroundColor: '#f0efe4ff',
  },
  buttonContainer: { marginTop: 10, marginBottom: 12, borderRadius: 8, backgroundColor: '#4CAF50' },
  buttonText: { color: 'rgba(238, 255, 4, 1)', fontSize: 23, padding: 12, textAlign: 'center' },
  result: { fontSize: 23, textAlign: 'center', fontWeight: 'bold', color: '#000000ff', marginVertical: 12 },
  chartLabel: { marginTop: 10, fontSize: 23, fontWeight: '600', textAlign: 'center' },
  chart: { marginVertical:10, borderRadius: 1,},
  label: { fontSize: 25, marginBottom: 6 },
  pickerContainer: { borderWidth: 1, borderColor: '#e1e9e7ff', borderRadius: 8, marginBottom: 16 },
  picker: {fontSize:23 ,height: 45, width: '100%' },
});
