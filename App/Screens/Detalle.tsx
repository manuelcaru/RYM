import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { GetInitialState } from '../Reducers/GetList';
import { useDispatch, useSelector } from 'react-redux';
import { getEpisode } from '../Actions/rickandmorty';

const { height, width } = Dimensions.get("screen")

const Detalle = () => {
    const dispatch = useDispatch();
    const list = useSelector((state: GetInitialState) => state.episodio)
    const route = useRoute();
    const [item, setEpisodes] = useState<any>(route.params)
    useEffect(() => {
        dispatch(getEpisode(item.substring(item.lastIndexOf("/") + 1)))
    }, [item])
    if(list){
        const {name, air_date, episode, created} = list;
        const creado = (new Date(Date.parse(created || ""))).toUTCString()
        return (
            <View style={styles.container}>
                <View style={styles.containerText}>
                    <Text style={styles.textItem}>Título:</Text>
                    <Text style={styles.textItem}>{name}</Text>
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.textItem}>Fecha de estreno:</Text>
                    <Text style={styles.textItem}>{air_date}</Text>
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.textItem}>Creado:</Text>
                    <Text style={styles.textItem}>{creado}</Text>
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.textItem}>Episodio:</Text>
                    <Text style={styles.textItem}>{episode}</Text>
                </View>
            </View>
        )
    }else{
        return <ActivityIndicator size="large" color="#0000ff" style={{ justifyContent: 'center', alignItems: 'center', marginTop: height * 0.4 }} />
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: width * 0.05
    },
    containerText: {
        opacity: 0.7,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 14,
        borderColor: 'green',
    },
    textItem:{
        fontWeight: 'bold',
        fontSize: width * 0.05
    }
});

export default Detalle;