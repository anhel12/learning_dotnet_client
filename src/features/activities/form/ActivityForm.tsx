import { observer } from 'mobx-react-lite';
import { ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';


const ActivityForm = () => {

	const navigate = useNavigate();
	const { activityStore } = useStore();
	const { 
		createActivity, 
		updateActivity, 
		loading , 
		loadActivity, 
		loadingInitial} = activityStore;

	const { id } = useParams<{id: string}>();

	const [activity, setActivity] = useState({
		id: '',
		title: '',
		category: '',
		description: '',
		date: '',
		city: '',
		venue: ''
	});

	useEffect(() => {
		if(id) loadActivity(id).then(activity => setActivity(activity!))
	}, [id, loadActivity]);

	const handleSubmit = () => {
		if(activity.id.length === 0) {
			let newActivity = {
				...activity,
				id: uuid()
			};
			createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`))
		} else {
			updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
		}
	}

	const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;

		setActivity({ ...activity, [name]: value })
	}
	
	if(loadingInitial) return <LoadingComponent content='Loading activity...' />

	return (
		<Segment clearing>
			<Form onSubmit={handleSubmit} autoComplete='off'>
				<Form.Input placeholder='Title'
					value={activity.title}
					name='title'
					onChange={handleInputChange}
				/>
				<Form.Input placeholder='Description'
					value={activity.description}
					name='description'
					onChange={handleInputChange}
				/>
				<Form.Input placeholder='Category'
					value={activity.category}
					name='category'
					onChange={handleInputChange}
				/>
				<Form.Input placeholder='Date'
					value={activity.date}
					name='date'
					type='date'
					onChange={handleInputChange}
				/>
				<Form.Input placeholder='City'
					value={activity.city}
					name='city'
					onChange={handleInputChange}
				/>
				<Form.Input placeholder='Venue'
					value={activity.venue}
					name='venue'
					onChange={handleInputChange}
				/>
				<Button
					loading={loading}
					floated='right'
					positive
					type='submit'
					content='Submit'
				/>
				<Button
					floated='right'
					type='submit'
					content='Cancel'
					as={Link}
					to='/activities'
				/>
			</Form>
		</Segment>
	)
}

export default observer(ActivityForm)