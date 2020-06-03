'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">Application documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-59730a291a0ea0858424d3220822d870"' : 'data-target="#xs-components-links-module-AppModule-59730a291a0ea0858424d3220822d870"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-59730a291a0ea0858424d3220822d870"' :
                                            'id="xs-components-links-module-AppModule-59730a291a0ea0858424d3220822d870"' }>
                                            <li class="link">
                                                <a href="components/AboutPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AboutPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AlertComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AlertComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BudgetReservationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BudgetReservationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CarPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CarPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FlightPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FlightPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HotelPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HotelPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TourPackagesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TourPackagesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserPostsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserPostsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppServerModule.html" data-type="entity-link">AppServerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppServerModule-17b6e6007e84902b8f3a3703b2a03a36"' : 'data-target="#xs-components-links-module-AppServerModule-17b6e6007e84902b8f3a3703b2a03a36"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppServerModule-17b6e6007e84902b8f3a3703b2a03a36"' :
                                            'id="xs-components-links-module-AppServerModule-17b6e6007e84902b8f3a3703b2a03a36"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChatModule.html" data-type="entity-link">ChatModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ChatModule-b934e4b858f7786e1ac9641a56f5c49f"' : 'data-target="#xs-components-links-module-ChatModule-b934e4b858f7786e1ac9641a56f5c49f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ChatModule-b934e4b858f7786e1ac9641a56f5c49f"' :
                                            'id="xs-components-links-module-ChatModule-b934e4b858f7786e1ac9641a56f5c49f"' }>
                                            <li class="link">
                                                <a href="components/ChatDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChatDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ChatModule-b934e4b858f7786e1ac9641a56f5c49f"' : 'data-target="#xs-injectables-links-module-ChatModule-b934e4b858f7786e1ac9641a56f5c49f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ChatModule-b934e4b858f7786e1ac9641a56f5c49f"' :
                                        'id="xs-injectables-links-module-ChatModule-b934e4b858f7786e1ac9641a56f5c49f"' }>
                                        <li class="link">
                                            <a href="injectables/ChatService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ChatService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DefaultModule.html" data-type="entity-link">DefaultModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DefaultModule-b0b0e61d275fee7047f6f21099015de6"' : 'data-target="#xs-components-links-module-DefaultModule-b0b0e61d275fee7047f6f21099015de6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DefaultModule-b0b0e61d275fee7047f6f21099015de6"' :
                                            'id="xs-components-links-module-DefaultModule-b0b0e61d275fee7047f6f21099015de6"' }>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardHotelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardHotelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DefaultComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DefaultComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManagerProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManagerProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotfoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotfoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PostsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PostsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersManagementComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersManagementComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-DefaultModule-b0b0e61d275fee7047f6f21099015de6"' : 'data-target="#xs-injectables-links-module-DefaultModule-b0b0e61d275fee7047f6f21099015de6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DefaultModule-b0b0e61d275fee7047f6f21099015de6"' :
                                        'id="xs-injectables-links-module-DefaultModule-b0b0e61d275fee7047f6f21099015de6"' }>
                                        <li class="link">
                                            <a href="injectables/DashboardService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DashboardService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-069df97d94b70333102816bf02a76979"' : 'data-target="#xs-components-links-module-SharedModule-069df97d94b70333102816bf02a76979"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-069df97d94b70333102816bf02a76979"' :
                                            'id="xs-components-links-module-SharedModule-069df97d94b70333102816bf02a76979"' }>
                                            <li class="link">
                                                <a href="components/AreaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AreaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ColumnchartComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ColumnchartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DonutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DonutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PieComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PieComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SalariesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SalariesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Message.html" data-type="entity-link">Message</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AlertsService.html" data-type="entity-link">AlertsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CarsService.html" data-type="entity-link">CarsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChatService.html" data-type="entity-link">ChatService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DashboardService.html" data-type="entity-link">DashboardService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HotelManagerService.html" data-type="entity-link">HotelManagerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostsServiceService.html" data-type="entity-link">PostsServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link">UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Airport.html" data-type="entity-link">Airport</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Airport-1.html" data-type="entity-link">Airport</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Carries.html" data-type="entity-link">Carries</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Carries-1.html" data-type="entity-link">Carries</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Cars.html" data-type="entity-link">Cars</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HotelCard.html" data-type="entity-link">HotelCard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HotelCard-1.html" data-type="entity-link">HotelCard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HotelManager.html" data-type="entity-link">HotelManager</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICars.html" data-type="entity-link">ICars</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IHotel.html" data-type="entity-link">IHotel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUsers.html" data-type="entity-link">IUsers</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Places.html" data-type="entity-link">Places</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Places-1.html" data-type="entity-link">Places</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Posts.html" data-type="entity-link">Posts</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Posts-1.html" data-type="entity-link">Posts</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Quotes.html" data-type="entity-link">Quotes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Quotes-1.html" data-type="entity-link">Quotes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Users.html" data-type="entity-link">Users</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});