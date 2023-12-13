import * as React from 'react';
import { Card, Paragraph } from 'react-native-paper';
import { StyleSheet, View, FlatList, Button } from 'react-native'
import axios from 'axios';

const Comment = () => {
    const [comments, setComments] = React.useState([]);
    const [posts, setPosts] = React.useState([]);
    const getComments = async () => {
        try {
            const post = await axios.get('http://localhost:3000/posts');
            const comment = await axios.get('http://localhost:3000/comments');
            setComments(comment.data);
            setPosts(post.data);

        } catch (error) {
            console.error(error);
        }
    };
    
    React.useEffect(() => {
        getComments();
    }, []);

    return (
        <View style={styles.container}>
        {posts.map((post) => {
            const comment = comments.find(comment => comment.postId === post.id);
            return (
                <View style={styles.item} key={post.id}>
                    <Card>
                        <Card.Title title={post.title} />
                        <Card.Cover style={styles.cover} source={{ uri: post.image }} />
                        <Card.Content>
                            <Paragraph>{post.body}</Paragraph>
                            {comment && <Paragraph>{comment.body}</Paragraph>}
                        </Card.Content>
                        <Card.Actions style={styles.container}>
                            <Button style={styles.button} onPress={() => {}}>Editar</Button>
                            <Button style={styles.button} onPress={() => {}}>Eliminar</Button>
                        </Card.Actions>
                    </Card>
                </View>
            );
        })}
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: "100%",
    },
    cover: {
        width: "40vh",
        height: "40vh",
    },
    item: {
    margin: 10,
    },
    button: {
        padding: 10,
        fontSize: 18,
        width: "100vh",
    }
})

export default Comment;