import React, { useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { ImageBackground, Pressable, View, Text, StyleSheet, Modal, TextInput, ScrollView } from 'react-native';
import { total } from './Bill';
const image = require('../images/background.png');

function HomeScreen({ navigation }: any) {
    useIsFocused();
    const [viewSaving, setViewSaving] = useState(false);
    const [viewIncome, setViewIncome] = useState(false);
    const [viewBills, setViewBills] = useState(false);
    const [savePercent, setSavePercent] = useState('0');
    const [income, setIncome] = useState('0.00');
    const [tempSaving, setTempSaving] = useState('');
    const [tempIncome, setTempIncome] = useState('');
    const onPressNavigate = () => {
        navigation.navigate('Bills');
        setViewBills(!viewBills);
    }
    const onPressViewSaving = () => {
        setViewSaving(!viewSaving);
    }
    const onPressAddSaving = () => {
        setSavePercent(tempSaving);
        setViewSaving(!viewSaving);
    }
    const onPressViewIncome = () => {
        setViewIncome(!viewIncome);
    }
    const onPressAddIncome = () => {
        let temp = parseFloat(tempIncome).toFixed(2);
        if (isNaN(temp as any)) {
            temp = '0.00';
        }
        setIncome(temp.toString());

        setViewIncome(!viewIncome);
    }

    const moneySaved = ((parseFloat(income) - total) * parseFloat(savePercent) / 100).toFixed(2);
    const afterExpense = (parseInt(income) - total).toFixed(2);

    const dailySpending = ((parseFloat(afterExpense) - parseFloat(moneySaved)) / 30).toFixed(2);
    return (
        /* View of the main page info container */
<ImageBackground source={image} style={{ width: '100%', height: '100%' }}>
        <View style={styles.infoContainer}>

            {/* View for the Tabs at the top of the screen */}
            <View style={styles.tabsContainer}>
                <Pressable
                    style={styles.tabsButton}
                    onPress={onPressNavigate}>
                    <Text style={styles.tabsText}>View Bills</Text>
                </Pressable>
                <Pressable
                    style={styles.tabsButton}
                    onPress={onPressViewSaving}>
                    <Text style={styles.tabsText}>Edit Saving Percentage</Text>
                </Pressable>
                <Pressable
                    style={styles.tabsButton}
                    onPress={onPressViewIncome}>
                    <Text style={styles.tabsText}>Edit income</Text>
                </Pressable>
            </View>{/* Ending view for tabs */}


            {/* View of the main page info container */}
            <ScrollView style={styles.infoContainer}>
                
                    <View style={styles.viewText}>
                        <Text style={styles.descText}>This is the amount you make each month.</Text>
                        <Text style={styles.infoText}>Monthly Income: ${income}</Text>
                    </View>
                    <View style={styles.viewText}>
                        <Text style={styles.descText}>This is the amount you make each month, after bills.</Text>
                        <Text style={styles.infoText}>Monthly Income after expenses: ${afterExpense}</Text>
                    </View>
                    <View style={styles.viewText}>
                        <Text style={styles.descText}>This is the percentage you want to save after your bill expenses.</Text>
                        <Text style={styles.infoText}>Saving Percentage: %{savePercent} </Text>
                    </View>
                    <View style={styles.viewText}>
                        <Text style={styles.descText}>This is the money you will save by the end of the month.</Text>
                        <Text style={styles.infoText}>Money saved by end of month: ${moneySaved}</Text>
                    </View>
                    <View style={styles.viewText}>
                        <Text style={styles.descText}>This is the amount you can spend daily without going over your budget.</Text>
                        <Text style={styles.infoText}>Daily Available Spending: ${dailySpending} </Text>
                    </View>
                
            </ScrollView>

            {/* Pop-up of saving percentage */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={viewSaving}
                onRequestClose={() => {
                    setViewSaving(!viewSaving);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Save percent:</Text>
                        <TextInput
                            style={[styles.modalText, styles.inputTextStyle]}
                            onChangeText={(x) => setTempSaving(x)}
                            placeholder="Enter Percent Saved"
                            keyboardType="numeric"
                            maxLength={2}
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={onPressAddSaving}>
                            <Text style={styles.textStyle}>Add</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={onPressViewSaving}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Pop-up of adding an income */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={viewIncome}
                onRequestClose={() => {
                    setViewIncome(!viewIncome);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Income Amount:</Text>
                        <TextInput
                            style={[styles.modalText, styles.inputTextStyle]}
                            onChangeText={(x) => setTempIncome(x)}
                            placeholder="Enter Income Amount"
                            keyboardType="numeric"

                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={onPressAddIncome}>
                            <Text style={styles.textStyle}>Add</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={onPressViewIncome}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>{/* Ending of adding an income */}

        </View>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    //Header
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    //Body
    infoContainer: {
        flex: 1,
        width: '100%',
    },
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
        marginTop: -53,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'green',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Main
    viewText: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'lightgreen',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
    },
    descText: {
        textAlign: 'center',
        padding: 20,

        fontSize: 15,
        marginTop: -15,
        marginBottom: -15,
    },
    infoText: {
        padding: 20,
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 20,
    },
    //Footer


    //Modales
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

export default HomeScreen;
