Папка хранящая специальные функции, роль которых - конечная обработка запросов к серверу. Эти функции выполняются последними при маршрутизации запросов на сервере и должны вернуть ответ на клиент.

Принято разбивать на отдельные подфайлы, сгруппированные по тому, с какой сущностью осуществляет работу запрос (пользователь, задача, товар и тд)

Часто контроллеры для разгрузки от сложной логики по работе с сущностями в базах данных используют посредников - **модели**, которые непосредственно осуществляют манипуляцию с даннными в базе данных.