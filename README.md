# skylinesAPI

Did you ever wondered which mods create issues with one another, which are incompatible and generally bad for the game Cities: Skylines? You can find that on this list: https://docs.google.com/spreadsheets/d/1mVFkj_7ij4FLzKs2QJaONNmb9Z-SRqUeG6xFGqEX1ew/edit#gid=0 However, during game patches you would be very lucky if you can access it. Besides, what if you don't like how it looks or you want to integrate it in one of your mods? That's where this API comes in handy.

You can add this api to your website or integrate it to your mod for Cities: Skylines. Have in mind that THIS IS NOT a list of all mods for Skylines, but only the ones that create issues.

When the basic api features are implemented, the documentation will be available on how to use it.

## Basic features
---
- CRUD (create, read, update and delete) for each collection
- Collections: Broken mods, Incompatible mods, Game breaking assets, Dependency mods for savegames and Latest patch issues.
- Basic queries: getAll, getSingle, public routes
- Advanced queries by mod creator, size, first added on,...
- Limit access to private routes
## Routes

Entry point: ` {{ DOMAIN }}/skylinesapi/ `

From there, the following routes will be available:


| Name/description | Method | Availability | Route | Implemented | Tested |
|      :--         |  :--- |     :---    | :---  |    :---:    | :---:  |
| Landing page as documentation|  GET | Public | `/` |   ☑   | ☒ |
| **Broken mods section** |
| Get all      | GET | Public | `/broken` |   ☑   | ☒ |
| Add          | POST| Private | `/broken` |   ☑   | ☒ |
| Edit         | PUT | Private | `/broken/:id` |   ☑   | ☒ |
| Delete       | DELETE | Private | `/broken/:id` |   ☑   | ☒ |
| **Incompatible mods** |
| Get all      | GET | Public | `/incompatible` |   ☒   | ☒ |
| Get single   | GET | Public | `/incompatible/:id` |   ☒   | ☒ |
| Add          | POST| Private | `/incompatible` |   ☒   | ☒ |
| Edit         | PUT | Private | `/incompatible/:id` |   ☒   | ☒ |
| Delete       | DELETE | Private | `/incompatible/:id` |   ☒   | ☒ |
| **Game breaking assets** |
| Get all      | GET | Public | `/gamebreaking` |   ☒   | ☒ |
| Get single   | GET | Public | `/gamebreaking/:id` |   ☒   | ☒ |
| Add          | POST| Private | `/gamebreaking` |   ☒   | ☒ |
| Edit         | PUT | Private | `/gamebreaking/:id` |   ☒   | ☒ |
| Delete       | DELETE | Private | `/gamebreaking/:id` |   ☒   | ☒ |
| **Dependency for savegames** |
| Get all      | GET | Public | `/savebreaking` |   ☒   | ☒ |
| Add          | POST| Private | `/savebreaking` |   ☒   | ☒ |
| Edit         | PUT | Private | `/savebreaking/:id` |   ☒   | ☒ |
| Delete       | DELETE | Private | `/savebreaking/:id` |   ☒   | ☒ |
| **Latest patch issues** |
| Get all      | GET | Public |     `/patch` |   ☒   | ☒ |
| Add          | POST| Private |    `/patch` |   ☒   | ☒ |
| Edit         | PUT | Private |    `/patch/:id` |   ☒   | ☒ |
| Delete       | DELETE | Private | `/patch/:id` |   ☒   | ☒ |

## Sorting

Sorting will also be possible. More details will be available when more documentation is generated.