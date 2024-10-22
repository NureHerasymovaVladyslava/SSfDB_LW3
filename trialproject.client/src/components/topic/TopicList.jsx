import React from 'react';
import TopicItem from './TopicItem';

function TopicList({ topics, onSelectTopic }) {
    return (
        <div>
            <h2>Topics</h2>
            {topics && topics.length > 0 ? (
                topics.map((topic) => (
                    <TopicItem key={topic.topicId} topic={topic} onSelectTopic={onSelectTopic} />
                ))
            ) : (
                <p>No topics found.</p>
            )}
        </div>
    );
}

export default TopicList;
