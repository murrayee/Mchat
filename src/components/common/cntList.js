const React = require('react');
const ReactNative = require('react-native');
const {
    Alert,
    Animated,
    Button,
    SectionList,
    StyleSheet,
    Text,
    View,
} = ReactNative;
const {
    HeaderComponent,
    FooterComponent,
    ItemComponent,
    PlainInput,
    SeparatorComponent,
    Spindicator,
    genItemData,
    pressItem,
    renderSmallSwitchOption,
    renderStackedItem,
} = require('./ListExampleShared');
const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

const VIEWABILITY_CONFIG = {
    minimumViewTime: 3000,
    viewAreaCoveragePercentThreshold: 100,
    waitForInteraction: true,
};
const renderSectionHeader = ({section}) => (
    <View style={styles.header}>
        <Text style={styles.headerText}>SECTION HEADER: {section.key}</Text>
        <SeparatorComponent />
    </View>
);

const renderSectionFooter = ({section}) => (
    <View style={styles.header}>
        <Text style={styles.headerText}>SECTION FOOTER: {section.key}</Text>
        <SeparatorComponent />
    </View>
);

const CustomSeparatorComponent = ({highlighted, text}) => (
    <View style={[styles.customSeparator, highlighted && {backgroundColor: 'rgb(217, 217, 217)'}]}>
        <Text style={styles.separatorText}>{text}</Text>
    </View>
);

class SectionListExample extends React.PureComponent {
    static title = '<SectionList>';
    static description = 'Performant, scrollable list of data.';

    state = {
        data: genItemData(10),
        debug: false,
        filterText: '',
        logViewable: false,
        virtualized: true,
    };
    _scrollPos = new Animated.Value(0);
    _scrollSinkY = Animated.event([{
            nativeEvent: {
                contentOffset: {y: this._scrollPos}
            }
        }],
        {useNativeDriver: true});


    render() {
        const filterRegex = new RegExp(String(this.state.filterText), 'i');
        const filter = (item) => (
            filterRegex.test(item.text) || filterRegex.test(item.title)
        );
        const filteredData = this.state.data.filter(filter);
        const filteredSectionData = [];
        let startIndex = 0;
        const endIndex = filteredData.length - 1;
        for (let ii = 10; ii <= endIndex + 10; ii += 10) {
            filteredSectionData.push({
                key: `${filteredData[startIndex].key} - ${filteredData[Math.min(ii - 1, endIndex)].key}`,
                data: filteredData.slice(startIndex, ii),
            });
            startIndex = ii;
        }

        return (
                <AnimatedSectionList

                    onRefresh={() => Alert.alert('onRefresh: nothing to refresh :P')}
                    onScroll={this._scrollSinkY}
                    refreshing={false}
                    renderItem={this._renderItemComponent}
                    renderSectionHeader={renderSectionHeader}
                    stickySectionHeadersEnabled
                    sections={filteredSectionData}
                    style={styles.list}
                    viewabilityConfig={VIEWABILITY_CONFIG}
                />
        );
    }

    _renderItemComponent = ({item, separators}) => (
        <ItemComponent
            item={item}
            onHideUnderlay={separators.unhighlight}
            onShowUnderlay={separators.highlight}
        />
    );

}

const styles = StyleSheet.create({
    customSeparator: {
        backgroundColor: 'rgb(200, 199, 204)',
    },
    header: {
        backgroundColor: '#e9eaed',
    },
    headerText: {
        padding: 4,
        fontWeight: '600',
    },
    list: {
        backgroundColor: 'white',
    },
    optionSection: {
        flexDirection: 'row',
    },
    searchRow: {
        paddingHorizontal: 10,
    },
    scrollToRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    separatorText: {
        color: 'gray',
        alignSelf: 'center',
        fontSize: 7,
    },
});

module.exports = SectionListExample;/**
 * Created by bear on 2018/3/6.
 */
