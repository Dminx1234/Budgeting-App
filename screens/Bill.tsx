import { useState } from 'react';
import { ImageBackground, Modal, FlatList, SafeAreaView, View, Text, StyleSheet, StatusBar, Pressable, TextInput} from 'react-native';


const image = require('../images/background.png');

export var total: number = 0;
interface Biller {
    billId: string,
    billName: string,
    billPrice: string,
};
const Bills: Biller[] = [];

const BillsScreen = () => {
  
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('Bill');
    const [price, setPrice] = useState('0');
    const [state, setState] = useState(false);

    const Bill = ({ billId, billPrice, billName }: any) => {
        const id = billId;
        let index = Bills.findIndex(i => i.billId === billId);
        const onPressRemoveBill = () => {
            Bills.splice(index, 1);
            total = Bills.reduce((prev, curr) => prev + parseInt(curr.billPrice), 0);
            setState(!state);
            console.log(Bills);
        }
        return (
            <View style={styles.items}>
                <Text style={styles.billPrice}>{billName}</Text>
                <Text style={styles.billPrice}>${parseInt(billPrice)}</Text>
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={onPressRemoveBill}>
                    <Text style={styles.textStyle}>Delete Bill</Text>
                </Pressable>
            </View>
        );
    };
    const renderItem = ({ item }: any) => (
        <Bill billId={item.billId} billName={item.billName} billPrice={item.billPrice} />
    );
    const onChangeText = (x: any) => {
        setPrice(x);
    }
    const onPressAddBill = () => {
        setModalVisible(true);
    }
    const onPressConfirm = () => {
        Bills.push({ billId: (Math.random() * 10) + '', billName: name, billPrice: price });
        total = Bills.reduce((prev, curr) => prev + parseInt(curr.billPrice), 0);
        setModalVisible(false);
        console.log(Bills);
    }
    return (
        <ImageBackground source={image} style={{ width: '100%', height: '100%' }}>
            <SafeAreaView style={styles.container}>
                <View style={styles.tabsContainer}>

                    <View style={styles.tabsButton}>
                        <Text style={styles.textStyle}>Total Bills: {Bills.length}</Text>
                    </View>
                    <View style={styles.tabsButton}>
                        <Text style={styles.textStyle}>Total Expenses: {total}</Text>
                    </View>
                    <Pressable
                        style={styles.tabsButton}
                        onPress={onPressAddBill}>
                        <Text style={styles.textStyle}>Add Bill</Text>
                    </Pressable>

                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Bill Name:</Text>
                            <TextInput
                                style={[styles.modalText, styles.inputTextStyle]}
                                onChangeText={setName}
                                placeholder="Enter Bill's Name"
                                keyboardType="default"
                            />
                            <Text style={styles.modalText}>Bill Price:</Text>

                            <TextInput
                                style={[styles.modalText, styles.inputTextStyle]}
                                onChangeText={onChangeText}
                                placeholder="Enter Bill's Name"
                                keyboardType="numeric"
                            />
                            <Pressable
                                key={Bills.length}
                                style={[styles.button, styles.buttonClose]}
                                onPress={onPressConfirm}>
                                <Text style={styles.textStyle}>Add Bill</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <FlatList
                    data={Bills}
                    renderItem={renderItem}
                    keyExtractor={item => item.billId}
                />

            </SafeAreaView>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    //Body
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    //Body header
    //Top navigation tabs
    tabsContainer: {
        flexDirection: 'row',
        
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabsText: {
        color: 'white',
    },
    tabsButton: {
        width: '35%',
        height: '50%',
        marginTop: -81,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'green',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Bill View
    items: {
        backgroundColor: 'lightgreen',
        borderWidth: 1,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    billPrice: {
        fontSize: 32,
    },
    //Modale Format
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        fontSize: 9,
        width: '70%',
        margin: 20,
        backgroundColor: 'lightgreen',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderColor: 'black',
        borderWidth: 1.3,
    },
    //Buttons within modale
    button: {
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        margin: 6,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: 'green',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    //Styles for text inside modale
    inputTextStyle:{
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
        
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        
    },
});

export default BillsScreen;
