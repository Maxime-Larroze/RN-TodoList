import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Modal } from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import colors from './src/Color/Colors'
import TodoList from './src/Todo/TodoList'
import AddListModal from './src/List/AddListModal'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class App extends React.Component {

  constructor(props) { super(props); this.state = {};}
  componentDidMount = () => {this.prechargement();}

  prechargement = async () => {
    this.state.lists = JSON.parse(await AsyncStorage.getItem('@todolist'));
    console.log(JSON.parse(await AsyncStorage.getItem('@todolist')));
  };

  state = {
    ajouterVisible: false,
    user: {},
    loading: false,
  }

  sauvegarde = async () => {
    try {
      AsyncStorage.setItem('@todolist', JSON.stringify(this.state.lists));
      console.log(await AsyncStorage.getItem('@todolist'));
    } catch (e) {
      console.log('Erreur lors du storage article Todo: ', e);
    }
  };

  toggleAddToDoModal() {this.setState({ajouterVisible: !this.ajouterVisible})}

  closeModalToggle() {this.setState({ajouterVisible: false})}

  ajouterListe = list => {
    this.setState({lists: [...this.state.lists, {...list, id: this.state.lists.name+"-"+ this.state.lists.length + 1, todos:[] }]})
    this.sauvegarde(this.state.lists);
  };

  supprimerByID = id => {
    const filteredData = this.state.lists.filter(item => item.id !== id);
    this.setState({ lists: filteredData });
    this.sauvegarde(this.state.lists);
  }

  updateListe = list => {
    this.setState({
      lists: this.state.lists.map(item => {
        return item.id === list.id ? list : item;
      })
    }),
    this.sauvegarde(this.state.lists);
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal animationType="slide" visible={this.state.ajouterVisible} onRequestClose={() => this.closeModalToggle()}>
          <AddListModal closeModal={() => this.closeModalToggle()} ajouterListe={this.ajouterListe}/>
        </Modal>
        <View style = {{flexDirection: "row"}}>
          <View style={styles.trait}/>
            <Text style={styles.titre}>
              <Text style={{fontWeight: "300", color: colors.bordeaux}}> Mes Tâches</Text>
            </Text>
          <View style={styles.trait}/>
        </View>
        <View style={{marginVertical: 48}}>
          <TouchableOpacity style={styles.ajouterListe} onPress={() => this.toggleAddToDoModal()}>
            <AntDesign name="plus" size={16} color={colors.bordeaux}/>
          </TouchableOpacity>
          <Text style={styles.titre_ajouter}>Ajouter une liste</Text>
        </View>
        <View style={{height: 275}}>
          <FlatList data={this.state.lists} keyExtractor={item => item.name} horizontal={true} showsHorizontalScrollIndicator={false} renderItem={({item, index}) => <TodoList list={item} updateListe={this.updateListe} deleteItemById ={this.supprimerByID}/>} keyboardShouldPersistTaps="always"/>
        </View>
        <View style={styles.copyright}>
          <Text style={{textAlign:'center', color:colors.bordeaux,}}>Copyright Maxime Larroze 2020</Text>
          <Image style={styles.tinyLogo} source={{uri: 'https://noti.asa-informatique.eu/Ressources/img/logo.png',}}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    alignItems:'center',
  },
  trait: {
    backgroundColor: colors.bordeaux,
    flex: 1,
    height: 3,
    alignSelf: "center",
  },
  titre: {
    fontSize: 39,
    fontWeight: "bold",
    color: colors.bordeaux,
    paddingHorizontal: 48,
  },
  titre_ajouter: {
    color: colors.bordeaux,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
  ajouterListe: {
    borderWidth: 2,
    borderColor: colors.bordeaux,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  copyright: {
    textAlignVertical: 'bottom',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
