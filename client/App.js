
import React , {useState, useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,
  ScrollView,
  SafeAreaView,ImageBackground,
  Alert, TextInput,Image } from 'react-native';
import { Button, Menu, Provider } from 'react-native-paper';
import * as Crypto from 'expo-crypto';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const api_url = 'http://192.168.0.101:5000'
let token = ''

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'SweetHome'}}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />

      </Stack.Navigator>
    
    </NavigationContainer>
  );
}


const HomeScreen = ({navigation}) => {
  const [account, setAccount] = React.useState('');
  const [password, setPassword] = React.useState('');
  const getPasswordHash= async ()=>{
    const digest = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA512,
      password
    );
    console.log(digest);
    return digest;
  }

  const checkAuthorization = async ()=>{
    const passwordHash = await getPasswordHash();
    let response = await fetch(`${api_url}/auth?username=${account}&password=${passwordHash}`);

    if (response.ok) { 
      let json = await response.json();
      console.log(json);
      if (!json.success) {
        alert(json.reason);
        return;
      }
      token = json.token;
      navigation.navigate('Profile', {name: account})
    } else {
      alert("Ошибка HTTP: " + response.status);
      return;
    }
  }

  return (
    
    <ImageBackground source={require("C:/Users/123/Desktop/6_semestor/PIN/Program-engineering-/Kursovoi_proekt/my-management-company/2.png")} resizeMode="cover" style={styles.imageFon}> 
      <SafeAreaView style={styles.container}>
      <View style={styles.containerHome}>
        <Image style={styles.image} source={require("C:/Users/123/Desktop/6_semestor/PIN/Program-engineering-/Kursovoi_proekt/my-management-company/1.png")} />
        <Text style={{fontWeight: 'bold', marginTop: 0.1,}}> Авторизация </Text>
        <TextInput
          style={styles.TextInput} 
          placeholder="Логин"
          placeholderTextColor="#000000"
          onChangeText={(value) => setAccount(value)}
          value={account}
          keyboardType="numeric"
        />
       
        
        
        <TextInput
          style={styles.TextInput}
          placeholder="Пароль"
          placeholderTextColor="#000000"
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
          value={password}
        />
        

        <Provider>
          {/* <Button onPress={() =>  navigation.navigate('Profile', {name: account})}> */}
          <Button onPress={checkAuthorization}>
          <Text style={styles.loginBtn}>Войти</Text> 
          </Button>
        <Text style={{fontStyle: 'italic', textAlign: 'center',}}> Логин и пароль от вашего аккаунта вы можете найти в договоре </Text>
        </Provider>
        </View>
        
    </SafeAreaView>
    </ImageBackground>
  );
};

const ProfileScreen = ({navigation, route}) => {

  const [visible, setVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      let response = await fetch(`${api_url}/is_admin?token=${token}`);

      if (response.ok) { 
        let json = await response.json();
        console.log(json);
        setIsAdmin(json.result);
      } else {
        alert("Ошибка HTTP: " + response.status);
        return;
      }
    }
    checkAdmin();
  },[])

  const closeMenu = () => setVisible(false);
  const openMenu = (v) => setVisible(true);
  return (
    <Provider>
      <View style={styles.container1}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button onPress={openMenu} mode="elevated">
              <Text style={styles.TextInput}>Меню</Text>
          </Button>}>
          <Menu.Item
            onPress={() =>  navigation.navigate('Profile')}
            title="Новости"
          />
          <Menu.Item
            onPress={() => {
              Alert.alert('Показания счетчиков : ', 'Переход на новую страницу ');
            }}
            title="Показания счетчиков"
          />
          <Menu.Item
            onPress={() => {
              Alert.alert('Квитанции : ', 'Переход на новую страницу');
            }}
            title="Квитанции"
          />
          <Menu.Item
            onPress={() => {
              Alert.alert('Платежи :', 'Переход на новую страницу');
            }}
            title="Платежи"
          />
           <Menu.Item
            onPress={() => {
              Alert.alert('Чаты :', 'Переход на новую страницу');
            }}
            title="Чаты"
          />
           <Menu.Item
            onPress={() => {
              Alert.alert('Заявка специалисту :', 'Переход на новую страницу');
            }}
            title="Заявка специалисту"
          />
        </Menu>

        <Button disabled={!isAdmin}>
          Добавить новость
          </Button>

      </View>
      <ScrollView style={{backgroundColor:"#CEE5D0", flex: 10, }}>
      
      

      <View style={styles.containerNews}>
      <Text style={{textAlign: 'center', fontWeight: 'bold',}}> Новая детская площадка! </Text>
      <Image style={styles.imageNews} source={require("C:/Users/123/Desktop/6_semestor/PIN/Program-engineering-/Kursovoi_proekt/my-management-company/3.png")} />
      <Text style={{textAlign: 'center',}}> Дорогие жильцы! Спешим уведомить вас, что в вашем районе закончен монтаж новой детской площадки... </Text>
      <Text> Дата: 15.05.2023 </Text>
      <Button onPress={() => {
              Alert.alert('Новая детская площадка! : ', 'Юным жителям будут доступны как привычные качели, турники, горки, балансиры, так и ряд элементов, выполненных по индивидуальному заказу: тренажер для тренировки ходьбы, горка с роликовым скатом, панель для рисования мелом и др.Значительное пространство займут инструменты для творчества, самовыражения и фантазии для детей разного возраста.');
            }}>
              <Text style={styles.TextInput}>Читать полный текст</Text>
          </Button>
      </View>
      
      <View style={styles.containerNews}>
      <Text style={{textAlign: 'center', fontWeight: 'bold',}}> Ремонтные работы! </Text>
      <Image style={styles.imageNews} source={require("C:/Users/123/Desktop/6_semestor/PIN/Program-engineering-/Kursovoi_proekt/my-management-company/4.png")} />
      <Text style={{textAlign: 'center',}}> Внимание жильцы! В период с 12.05 по 14.05 будут проводиться ремонтные работы во дворе дома... </Text>
      <Text> Дата: 15.05.2023 </Text>
      <Button onPress={() => {
              Alert.alert('Ремонтные работы! : ', 'Уважаемые жители ЖК “SH”! 12.05, с 14:00 до 17:00 14.05, будет отключена холодная и горячая вода по стояку квартиры №453, в связи с проведением ремонтных работ. Приносим свои извинения за временные неудобства!');
            }}>
              <Text style={styles.TextInput}>Читать полный текст</Text>
          </Button>
      </View>

      <View style={styles.containerNews}>
      <Text style={{textAlign: 'center', fontWeight: 'bold',}}> Субботник! </Text>
      <Image style={styles.imageNews} source={require("C:/Users/123/Desktop/6_semestor/PIN/Program-engineering-/Kursovoi_proekt/my-management-company/5.png")} />
      <Text style={{textAlign: 'center',}}> Внимание жильцы! 20.05 состоится всеобщий субботник на территории двора. Приглашаем всех... </Text>
      <Text> Дата: 17.05.2023 </Text>
      <Button onPress={() => {
              Alert.alert('Субботник! : ', 'Уважаемые жители ЖК “SH”! 20.05 состоится всеобщий субботник на территории двора. Приглашаем всех поучаствовать. Наличие инструментов для уборки будет большим плюсом :)');
            }}>
              <Text style={styles.TextInput}>Читать полный текст</Text>
          </Button>
      </View>

    </ScrollView>
    </Provider>
  
  );
};

//component named Screen1 with menu

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  containerHome: {
    //flex:0.7,
    backgroundColor: "#FED2AA",
    alignItems: "center",
    justifyContent: "center",
    width:  250,
    height: 350,
    marginLeft:  80,
    marginTop: 200,
    borderRadius: 20,
    justifyContent: 'center',
    
  },
  image: {
    marginBottom: 10,
    width: 100,
    height: 100,
  },

  imageFon: {
    flex: 1,
    justifyContent: 'center',
  },

  imageNews: {
    marginBottom: 15,
    width: 120,
    height: 120,
  },
  TextInput: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    width: 200,
    textAlign: "center",
    backgroundColor: "#FFFFF0",
    color: "#000000",
  },
  loginBtn: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    color: "#000000",
    backgroundColor: "#F3F0D7",
  },
  container1: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 70,
    paddingVertical: 12,
    backgroundColor: '#FFBF86',
  },
  containerNews: {
   // flex:0.6,
    backgroundColor: "#FED2AA",
    alignItems: "center",
    justifyContent: "center",
    width:  250,
    height: 290,
    marginLeft:  70,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 20,
    justifyContent: 'center',
  },
  
});

