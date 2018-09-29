import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <DropdownItem tag={Link} to="/entity/partner">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.partner" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/distributor">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.distributor" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/town">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.town" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/company">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.company" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/route">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.route" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/resa">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.resa" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/travel">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.travel" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/config-fare">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.configFare" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/config-commission">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.configCommission" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/planning">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.planning" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/cabin">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.cabin" />
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
