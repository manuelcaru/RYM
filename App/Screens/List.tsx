import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { ListItem, SearchBar, Image } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { getList } from '../Actions/rickandmorty';
import { GetInitialState, itemList } from '../Reducers/GetList';
import { useNavigation } from '@react-navigation/native';


type SearchBarTS = string;
type PageTS = number;
type itemRender = {
  item: itemList
}

const { height, width } = Dimensions.get("screen")




const List = () => {
  const dispatch = useDispatch();
  const list = useSelector((state: GetInitialState) => state.list)
  const httpOk = useSelector((state: GetInitialState) => state.list_ok)
  const [localList, setLocalList] = useState<itemList[]>([])
  const [searchBar, setSearchBar] = useState<SearchBarTS>('');
  const [page, setPage] = useState<PageTS>(1)
  const navigation = useNavigation();


  console.log(list)
  useEffect(() => {
    dispatch(getList(page));
  }, [page])
  useEffect(() => {
    searchBar === "" ? setLocalList(list) : filterSearch(searchBar)
  }, [list])

  const endReached = () => {
    console.log('endreached')
    httpOk ? setPage(page + 1) : null;
  }
  const keyExtractor = (item: object, index: number) => index.toString()
  const renderItem = ({ item }: itemRender) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Profile', item)} style={styles.containerTouch}>
        <ListItem bottomDivider key={item.id}>
          <Image borderRadius={50} source={{ uri: item.image }} style={{ width: width * 0.2, height: width * 0.2 }} PlaceholderContent={<ActivityIndicator color="#9900ff" />} />
          <ListItem.Content>
            <ListItem.Title style={{fontWeight: 'bold'}}>{item.name}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron size={20} color={"black"}/>
        </ListItem>
      </TouchableOpacity>
    )
  }
  const listaItems = useMemo(() => {
    return (
      <FlatList
        style={styles.containerFlat}
        onEndReached={() => endReached()}
        onEndReachedThreshold={0.5}
        keyExtractor={keyExtractor}
        data={localList}
        renderItem={renderItem}
        initialNumToRender={20}
        getItemLayout={(data, index) => (
          { length: height, offset: 0, index }
        )}
      />)
  }, [list, localList])

  const filterSearch = (search:string) => {
      const newList = list.filter((item)=>item.name.includes(search));
      setSearchBar(search);
      setLocalList(newList);
      httpOk ? setPage(page + 1) : null;
  }

  return (
    <View>
      <SearchBar
        placeholder="Buscar..."
        onChangeText={(e) => filterSearch(e)}
        value={searchBar}
      />
      { list ?
        listaItems
        :
        <ActivityIndicator size="large" color="#0000ff" style={{ justifyContent: 'center', alignItems: 'center', marginTop: height * 0.4 }} />
      }
    </View>
  )
}
const styles = StyleSheet.create({
  containerFlat: {
    backgroundColor: 'black'
  },
  containerTouch: {
    backgroundColor: 'black',
    shadowColor: "black",
    elevation: 14,
    margin: width * 0.01
  }
})
export default List;