import { NavLink, Outlet } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react'

const NavBar = () => {

return (
	<>
		<Menu inverted fixed='top'>
			<Container>
				<Menu.Item as={NavLink} to='/' header>  
					<img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
					Reactivities
				</Menu.Item>
				<Menu.Item as={NavLink} to ='/activities' name='Activities'>

				</Menu.Item>
				<Menu.Item>
					<Button 
						positive 
						content='Create Activity'
						as={NavLink}
						to='/createActivity'
						/>
				</Menu.Item>
			</Container>
		</Menu>
		<Outlet />
	</>
	
)
}

export default NavBar