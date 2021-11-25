import * as Icon from 'react-bootstrap-icons';

const Topics = (props) => {
    const listTopics = props.topics.map((topic, index) =>
        <div className="col d-flex align-items-start py-4" key={index}>
            <Icon.BookHalf className="bi icon-blue text-muted flex-shrink-0 me-3" size="2em" />
            <div>
                <h5 className="fw-bold mb-0">{topic}</h5>
            </div>
        </div>);

    return (
        <div className="container px-4 pt-5">
            <h2 className="pb-2 border-bottom">Temas</h2>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
                {listTopics}
            </div>
        </div>
    );
}

export default Topics;