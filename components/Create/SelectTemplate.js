import React from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import TopBar from '../TopBar/Bar';

import { pallette, styles } from '../../styles';

const SelectTemplate = ({
    templates,
    getTemplate,
    firestore,
    history,
    auth,
}) => {
    const renderTemplateItem = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => {
                const template = getTemplate[item.id];
                let logic = JSON.parse(template.logic);
                const variables = logic.variables.reduce((acc, cur) => {
                    acc[cur.name] = cur.type === 'Int' ? 0 : ''; //default is String
                    return acc;
                }, {});

                let game = {
                    admin: auth.uid,
                    variables,
                    template: item.id,
                };

                firestore.add({ collection: 'games' }, game).then(ref => {
                    console.log(`Created game ${ref.id}`);
                    history.push(`/create/` + ref.id);
                });
            }}
        >
            <Text
                style={[
                    styles.listViewRow,
                    index % 2
                        ? { backgroundColor: pallette.lightergray }
                        : { backgroundColor: pallette.white },
                ]}
            >
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    return (
        <>
            <TopBar
                left={{ linkTo: '/home', iconName: 'times' }}
                logoLeft="Select"
                logoRight="Template"
            />
            {templates ? (
                <FlatList
                    style={styles.listView}
                    data={templates}
                    renderItem={renderTemplateItem}
                    keyExtractor={template => template.id}
                />
            ) : null}
        </>
    );
};

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    getTemplate: state.firestore.data.templates,
    templates: state.firestore.ordered.templates,
});

export default compose(
    firestoreConnect(['templates', 'games']),
    connect(mapStateToProps)
)(SelectTemplate);
