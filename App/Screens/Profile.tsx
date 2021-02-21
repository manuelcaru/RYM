import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ListItem, Avatar, Divider } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


const { height, width } = Dimensions.get("screen")

const Profile = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [item, setEpisodes] = useState<any>(route.params)
    console.log('la ruta params es ', route)

    const renderItem = ({item}: any) => {
        const episodio = item.substring(item.lastIndexOf("/")+1)
        return(
        <TouchableOpacity onPress={() => navigation.navigate('Detalle', item)} style={styles.containerTouch}>
        <ListItem bottomDivider key={episodio}>
          <ListItem.Content>
            <ListItem.Title>Episodio nº {episodio}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
      )};
    const keyExtractor = (item: object, index: number) => index.toString()
    return (
        <View style={styles.container}>
            <View style={styles.containerAvatar}>
                <Avatar
                    title={item.name[0]}
                    source={{ uri: item.image }}
                    size={width * 0.6}
                    rounded
                />
            </View>
            <Divider style={{ backgroundColor: 'black' }} />
            <View style={styles.containerDetalles}>
                <Text style={styles.textRight}>DETALLES</Text>
            </View>
            <Divider style={{ backgroundColor: 'black' }} />
            <View style={styles.containerText}>
                <View style={styles.containerRowLeft}>
                    <Text style={styles.textLeft}>Nombre:</Text>
                    <Text style={styles.textLeft}>Género:</Text>
                    <Text style={styles.textLeft}>Especie:</Text>
                    <Text style={styles.textLeft}>Estado:</Text>
                </View>
                <View style={styles.containerRowRight}>
                    <Text style={styles.textRight}>{item.name}</Text>
                    <Text style={styles.textRight}>{item.gender}</Text>
                    <Text style={styles.textRight}>{item.species}</Text>
                    <Text style={styles.textRight}>{item.status}</Text>
                </View>
            </View>
            <Divider style={{ backgroundColor: 'black' }} />
            <View style={styles.containerDetalles}>
                <Text style={styles.textRight}>APARICIONES</Text>
            </View>
            <View style={styles.containerApariciones}>
                <FlatList
                    data={item.episode}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    style={styles.containerFlat}
                />
            </View>
            <Divider style={{ backgroundColor: 'black' }} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerAvatar: {
        flex: 0.35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4bbda2'
    },
    containerText: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#4bbda2'
    },
    containerRowLeft: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.3
    },
    containerRowRight: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.7
    },
    textLeft: {
        fontSize: width * 0.05,
        fontWeight: 'bold'
    },
    textRight: {
        fontSize: width * 0.05,
        fontWeight: 'bold'
    },
    containerDetalles: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#19AF88'
    },
    containerApariciones: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.45,
        backgroundColor: '#4bbda2',
    },
    containerTouch: {
        margin: width * 0.01,
        elevation: 14
    },
    containerFlat: {
        width: width
    }
});

export default Profile;