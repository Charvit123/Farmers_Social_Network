import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import hostname from "../const/hostname";
import COLORS from "../const/colors";

const userProfile = ({ navigation }) => {
    const [user, setUser] = useState({});
    const [diss, setPost] = useState({});
    useEffect(async () => {
        const id = await AsyncStorage.getItem("id");

        const url = "http://" + hostname + ":5000/api/finduser";
        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({ id }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const jsonRes = await res.json();
        setUser(jsonRes.user);

        const url2 = "http://" + hostname + ":5000/api/userPost";
        const res2 = await fetch(url2, {
            method: "POST",
            body: JSON.stringify({ id }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const jsonRes1 = await res2.json();
        setPost(jsonRes1.getUsersPost);
    }, []);

    const Card = (diss) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Details", diss)}
            >
                <View style={style.card}>
                    <View
                        style={{
                            height: 200,
                            alignItems: "center",
                        }}
                    >
                        <Image
                            source={{ uri: diss.diss[1].images[0] }}
                            style={{ resizeMode: "contain", width: "100%", height: 200 }}
                        />
                    </View>
                    <View style={style.cardInfo}>
                        <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                            {diss.diss[1].title}
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 5,
                            }}
                        >
                            <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                                {diss.diss[1].description}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <View style={style.userprofile}>
                <Image
                    style={style.userimg}
                    source={{ uri: user.avatar }}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 100,
                        resizeMode: "contain",
                    }}
                />

                <View style={style.userdetails}>
                    <Text style={{ marginLeft: 10 }}>{user.username}</Text>
                    <Text>{user.email}</Text>
                </View>
            </View>

            <ScrollView>
                {diss &&
                    Object.entries(diss).map((item, i) => {
                        return <Card diss={item} key={i} />;
                    })}
            </ScrollView>
        </View>
    );
};

export default userProfile;
const style = StyleSheet.create({
    container: {
        height: 100,
        backgroundColor: COLORS.light,
        width: "100%",
        marginHorizontal: 2,
        borderRadius: 10,
        marginBottom: 10,
        padding: 15,
        display: "flex",

        justifyContent: "space-around",
    },
    card: {
        height: 300,
        backgroundColor: COLORS.light,
        width: "100%",
        marginHorizontal: 2,
        borderRadius: 10,
        marginBottom: 20,
        padding: 15,
        display: "flex",
        justifyContent: "space-around",
    },
    cardInfo: {
        marginTop: 30,
    },
    userimg: {
        height: 5,
        width: 5,
        borderRadius: 50,
    },
    userprofile: {
        display: "flex",
        flexDirection: "row",
    },
    userdetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
});