import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Modal, Alert} from 'react-native'
import colors from '../Color/Colors'
import TodoModal from '../Modal/TodoModal'

export default class TodoList extends React.Component {

    state = {showListVisible: false};

    toggleListModal() {this.setState({showListVisible: !this.showListVisible});}

    render() {
        const list = this.props.list;
        const completedCount = list.todos.filter(todo => todo.completed).length;
        const remainingCount = list.todos.filter(todo => todo.completed == false).length;

        return (
            <View>
                <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={() => this.toggleListModal()}>
                    <TodoModal list={list} closeModal={() => this.setState({showListVisible: false})} updateListe={this.props.updateListe}/>
                </Modal>
                <TouchableOpacity style={[styles.listContainer, {backgroundColor: list.color}]} onPress={() => this.toggleListModal()} onLongPress={() => Alert.alert("Suppression Liste", "Supprimer la liste " + list.name + " ?", [{text: 'OK', onPress: () => this.props.deleteItemById(list.id)},{text: 'Retour'}])}>
                    <Text style={styles.titreListe} numberOfLines={1}>{list.name}</Text>
                    <View>
                        <View style={{alignItems:"center"}}>
                            <Text style={styles.Compteur}>{remainingCount}</Text>
                            <Text style={styles.titre2}>Tâches Restantes</Text>
                        </View>
                        <View style={{alignItems:"center"}}>
                            <Text style={styles.Compteur}>{completedCount}</Text>
                            <Text style={styles.titre2}>Tâches Complêtées</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: "center",
        width: 200,
    },
    titreListe: {
        fontSize: 24,
        fontWeight: "700",
        color: colors.white,
        marginBottom: 18,
    },
    Compteur: {
        fontSize: 48,
        fontWeight: "200",
        color: colors.white,
    },
    titre2: {
        fontSize: 12,
        fontWeight: "700",
        color: colors.white,
    },
});