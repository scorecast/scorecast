import React from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-native';

import TopBar from '../TopBar/Bar';

import { pallette, styles } from '../../styles';

const SelectTemplate = ({ templates }) => {
    console.log('what');
    const renderTemplateItem = ({ item, index }) => (
        <Link
            to={`/create/${item.id}`}
            activeOpacity={0.5}
            component={TouchableOpacity}
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
        </Link>
    );

    return (
        <>
            <TopBar
                leftButton={{ linkTo: '/home', iconName: 'times' }}
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
    templates: state.firestore.ordered.templates,
});

export default compose(
    firestoreConnect(['templates']),
    connect(mapStateToProps)
)(SelectTemplate);
