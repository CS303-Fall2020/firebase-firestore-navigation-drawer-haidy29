import React, { useState , useEffect ,Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  CheckBox,
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Header from '../components/header';
import TodoItem from '../components/todoitem';
import AddTodo from '../components/addtodo';
import Sandbox from '../components/sandbox';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { decode, encode } from "base-64";


export default function App({ navigation }) {
  if (!global.btoa) {
    global.btoa = encode;
  }  
  if (!global.atob) {
   global.atob = decode;
  }
  // const [todos, setTodos] = useState([
  //   { text: 'buy coffee', key: '1',completed: false },
  //   { text: 'create an app', key: '2' ,completed: false},
  //   { text: 'play on the switch', key: '3',completed: false }
  // ]);

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] =useState(false);
  const[userId,setUserId]=useState(firebase.auth().currentUser.uid)
  var db= firebase.firestore();

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/todos?userId=1")
  //   .then(response => response.json())
  //   .then(response => {
  //     setTodos(response),
  //     setLoading(false);
  //   })
  //   .catch(e => {
  //     console.error(e);
  //   })
  // },[]);
  const pressHandler = id => {
    var todoItem = db.collection("Todos").where("id", "==", id)
    todoItem.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
        console.log("Document successfully deleted!")
      })
    }).catch(function(error) {
      console.error("Error removing document: ", error);
     });
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id != id);

    });
  };
 

  useEffect(() => {
    Refresh();
  }, [])

  const submitHandler = title => {
    if (title.length > 3) {
      let todo = {
        userId: userId, title: title, id: Math.random().toString() , completed:false,date:Date.now().toString()};
        db.collection("Todos").add(todo)
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
      todo.id= Math.random().toString();
      setTodos(prevTodos=>{
        return[todo, ...prevTodos]
      })
      
    } else {
      Alert.alert('OOPS!', 'Todo must over 3 chars long', [
        { text: 'Understood', onPress: () => console.log('alert closed') }
      ]);
    }
  };
  const Refresh =  () => {
    setLoading(true);
    db.collection("Todos").where("userId", "==", userId).get() 
    .then((querySnapshot) => {
      setLoading(false);
      setTodos([]);
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        setTodos((prevTodos) => {
          return [doc.data(), ...prevTodos]
        })
      })
    })
    .catch(e => {
      console.error(e);
    })
  
  }
  // const pressHandler1 = () => {
  //   navigation.navigate('ReviewDetails')
  //  //navigation.push('ReviewDetails')

  // }
  const pressHandler3 = id => {
  setTodos(prevTodos=> {
    return prevTodos.filter(todo => {
    if((todo.id !=id)== false){
      todo.completed = !todo.completed;
    }
    return true;
  })
  })
}

  const pressHandler2 = (item) => {
    navigation.navigate('ReviewDetails',{item,edit})
   //navigation.push('ReviewDetails')

  }
  const edit = (id,title)=>{
    var todoItem = db.collection("Todos").where("id", "==", id)
    todoItem.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.update({title: title})
        console.log("Document successfully updated!")
      })
    })
    setTodos(prevTodos=> {
      return prevTodos.filter(todo => {
      if((todo.id !=id)== false){
        todo.title = title;
      }
      return true;
    })
    })
navigation.navigate('Home');
  }
  
  const OnSignOut = () => {
    firebase.auth().signOut();
  }

  return (
    // <Sandbox />
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        console.log('dimissed keyboard');
      }}
    >
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            {(loading)?(
              <ActivityIndicator size= 'large' color ='coral'/>

            )
            :(
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} 
               pressHandler={pressHandler}
//submitHandler={submitHandler}
                //pressHandler1={pressHandler1} 
                pressHandler2={pressHandler2} 
                pressHandler3={pressHandler3} 
                edit={edit}

                 />
              )}
            />
            )}
          </View>
        </View>
        {/* <Button title='go to review dets' onPress={pressHandler2} /> */}
        <Button title='Refresh' color='coral'onPress={Refresh} />

      </View>
    </TouchableWithoutFeedback>
  );
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    padding: 40,
    flex: 1
  },
  list: {
    flex: 1,
    marginTop: 20
  }
});
