import React from 'react'
import {View, StyleSheet, Text, KeyboardAvoidingView, TouchableOpacity, TextInput} from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import colors from '../Color/Colors'

export default class AddListModal extends React.Component {

    backgroundColors = ['#581845', '#900C3F', '#C70039', '#FF5733', '#FFC30F'];
    state = {name: "", color: this.backgroundColors[0]}

    creerTache = () => {
        const {name, color} = this.state;
        const list = {name, color};
        this.props.ajouterListe(list);
        this.setState({name: ""});
        this.props.closeModal();
    }

    renderColors() {
        return this.backgroundColors.map(color => {
            return (<TouchableOpacity key={color} style={[styles.couleurSelection, {backgroundColor: color}]} onPress={() => this.setState({color})}/>)
        });
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <TouchableOpacity style={{position: "absolute", top: 64, right: 32}} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={24} color={colors.black}></AntDesign>
                </TouchableOpacity> 
                <View style={{alignSelf: "stretch", marginHorizontal: 32}}>
                    <Text style={styles.titre}>Créer une nouvelle liste de tâches</Text>
                    <TextInput style={styles.input} placeholder="Nom de la liste" onChangeText={text => this.setState({name: text})}/>
                    <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 12}}>{this.renderColors()}</View>
                    <TouchableOpacity style={[styles.btn, {backgroundColor: this.state.color}]} onPress={this.creerTache}>
                        <Text style={{color: colors.white, fontWeight: "600"}}>Créer</Text>
                    </TouchableOpacity>
                    <View style={styles.copyright}>
                        <Text style={{textAlign:'center', color:colors.bordeaux,}}>Copyright Maxime Larroze 2020</Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    titre: {
        fontSize: 28,
        fontWeight: "bold",
        color: colors.black,
        alignSelf: "center",
        textAlign: 'center',
        marginBottom: 25,
    },
    copyright: {
        textAlignVertical: 'bottom',
        marginTop: 50,
    },

    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18
    },
    couleurSelection: {
        width: 30,
        height: 30,
        borderRadius: 4,
    },
    btn: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
    },
});