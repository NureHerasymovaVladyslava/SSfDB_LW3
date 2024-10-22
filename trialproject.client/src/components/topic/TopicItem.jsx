import React from 'react';

function TopicItem({ topic, onSelectTopic }) {
    return (
        <div className="course-item" onClick={() => onSelectTopic(topic.topicId)}>
            <h3>{topic.name}</h3>
        </div>
    );
}

export default TopicItem;
