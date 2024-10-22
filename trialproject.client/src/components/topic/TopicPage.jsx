import { useEffect, useState } from 'react';
import TopicList from './TopicList';
import TopicDetails from './TopicDetails';

function TopicPage() {
    const [topics, setTopics] = useState();
    const [selectedTopic, setSelectedTopic] = useState(null);

    const handleTopicSelect = (topicId) => {
        async function getTopic(topicId) {
            const response = await fetch(`api/topic/${topicId}`);
            const data = await response.json();
            setSelectedTopic(data);
        }

        getTopic(topicId);
    };

    useEffect(() => {
        async function getTopics() {
            const response = await fetch('api/topic');
            const data = await response.json();
            setTopics(data);
        }

        getTopics();
    }, []);

    return (
        <div className="course-container">
            <div className="course-list-container">
                <TopicList topics={topics} onSelectTopic={handleTopicSelect} />
            </div>

            <div className="course-details-container" style={{ display: selectedTopic ? 'block' : 'none' }}>
                {selectedTopic && (
                    <TopicDetails topic={selectedTopic} onBack={() => setSelectedTopic(null)} />
                )}
            </div>
        </div>
    );
}

export default TopicPage;