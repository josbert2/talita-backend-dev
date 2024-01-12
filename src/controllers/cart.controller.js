// cartController.js
import { pool } from "../db.js";

export const createItemCart = async (req, res) => {


    const { menu_id,  id_usuario, cantidad } = req.body;

    

    try {
        // Verificar si el usuario ya tiene un carrito activo
        let [carritos] = await pool.query("SELECT cart_id FROM menu_carts WHERE usuario_id = ?", [id_usuario]);
    

        let cart_id;

        // Si no tiene un carrito, crear uno
        if (carritos.length === 0) {
            const [rows] = await pool.query("INSERT INTO menu_carts (usuario_id) VALUES (?)", [id_usuario]);
            cart_id = rows.insertId;
        
        } else {
            cart_id = carritos[0].cart_id;
        }

        // Insertar el ítem al carrito
        const [rowsCart] = await pool.query("INSERT INTO cart_items (menu_id, user_id, cantidad) VALUES (?, ?,  ?)", [
            menu_id,
            id_usuario,
            cantidad
        ]);

        

    

        res.json({ success: true, message: 'Item added to cart.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error });
    }
}

export const orderCart = async (req, res) => {

    
    const {
        table_number,
        order_date,
        status,
        total_price,
        special_instructions,
        for_takeout,
        method_payment,
        client_id
    } = req.body;

    
    const created_at = new Date();
    const updated_at = new Date();

    try {
        // Insertar la información de la orden en la base de datos
        const [orderRows] = await pool.query(
            "INSERT INTO orders (table_number, order_date, status, total_price, special_instructions, for_takeout, method_payment, client_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                table_number,
                order_date,
                status,
                total_price,
                special_instructions,
                for_takeout,
                method_payment,
                client_id,
                created_at,
                updated_at
            ]
        );

        const orderId = orderRows.insertId;


        
        // Insertar los detalles de la orden (productos en el carrito) en la base de datos
        const { cartItems } = req.body;
        for (const cartItem of cartItems) {
            const { id_menu, categoria_id, qty, id_usuario, precio, notes } = cartItem;
            await pool.query(
                "INSERT INTO orderdetails (order_id, menu_id, categoria_id, quantity, id_usuario, item_price, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [orderId, id_menu, categoria_id, qty, id_usuario, precio, notes]
            );
        }

        return res.json({ success: true, message: "Orden almacenada exitosamente", id: orderId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error al almacenar la orden" });
    }
};

export const getAllOrders = async (req, res) => {


    try {
        const [rows] = await pool.query(`SELECT * FROM orders
        JOIN clientes ON orders.client_id = clientes.id ORDER BY order_id DESC`);
    

    

        res.json(rows);


    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error });
    }



}

export const getCartItemsByOrder = async (req, res) => {

    const { id } = req.params;

    // get orders con ordersdetails

    try {
        const [rows] = await pool.query(`
            SELECT * FROM orders 
            JOIN clientes ON orders.client_id = clientes.id
            WHERE order_id = ?
        `, [id]);

        

        const [rows2] = await pool.query(`
                    SELECT 
                    od.order_detail_id,
                    od.order_id,
                    od.menu_id,
                    od.categoria_id,
                    od.id_usuario,
                    od.quantity,
                    od.item_price,
                    od.notes,
                    m.id AS menu_id,
                    m.categoria_id AS menu_categoria_id,
                    m.nombre AS menu_nombre,
                    m.descripcion AS menu_descripcion,
                    m.ingredientes AS menu_ingredientes,
                    m.precio AS menu_precio,
                    m.precioOferta AS menu_precioOferta,
                    m.stock AS menu_stock,
                    m.imagen AS menu_imagen,
                    m.tipo AS menu_tipo,
                    m.user_id AS menu_user_id,
                    m.createdAt AS menu_createdAt,
                    m.updatedAt AS menu_updatedAt
                FROM orderdetails AS od
                JOIN menus AS m ON od.menu_id = m.id
                WHERE od.order_id = ?;
        `, [id]);

        
    
        
    



        const combinedData = {
            orders: rows,
            orderDetails: {
                details: rows2 
            }
        };


        res.json(combinedData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error });
    }

    
}

export const getCartItemsDashboard = async (req, res) => {
    try {
      const [rows] = await pool.query(`
        SELECT 
          orders.order_id,
          orders.table_number,
          orders.order_date,
          orders.status,
          orders.total_price,
          orders.special_instructions,
          orders.for_takeout,
          orders.method_payment,
          orders.client_id,
          orders.created_at,
          orders.updated_at,
          clientes.id AS cliente_id,
          clientes.nombre AS cliente_nombre,
          clientes.apellido AS cliente_apellido,
          -- Agrega otras columnas de clientes si es necesario
          orderdetails.order_detail_id,
          orderdetails.quantity,
          orderdetails.item_price,
          orderdetails.notes,
          menus.id AS menu_id,
          menus.categoria_id AS menu_categoria_id,
          menus.nombre AS menu_nombre,
          menus.descripcion AS menu_descripcion,
          menus.ingredientes AS menu_ingredientes,
          menus.precio AS menu_precio,
          menus.precioOferta AS menu_precioOferta,
          menus.stock AS menu_stock,
          menus.imagen AS menu_imagen,
          menus.tipo AS menu_tipo,
          menus.createdAt AS menu_createdAt,
          menus.updatedAt AS menu_updatedAt
        FROM 
          orders
        JOIN 
          orderdetails ON orders.order_id = orderdetails.order_id
        JOIN 
          menus ON orderdetails.menu_id = menus.id
        JOIN 
          clientes ON orders.client_id = clientes.id
        ORDER BY orders.order_id DESC
        
        
      `);
  
      // Organiza los resultados en la estructura deseada
      const formattedOrders = rows.reduce((acc, row) => {
        const existingOrder = acc.find((item) => item.order_id === row.order_id);
        const orderDetail = {
          order_detail_id: row.order_detail_id,
          quantity: row.quantity,
          item_price: row.item_price,
          notes: row.notes,
          menu: {
            id: row.menu_id,
            categoria_id: row.menu_categoria_id,
            nombre: row.menu_nombre,
            descripcion: row.menu_descripcion,
            ingredientes: row.menu_ingredientes,
            precio: row.menu_precio,
            precioOferta: row.menu_precioOferta,
            stock: row.menu_stock,
            imagen: row.menu_imagen,
            tipo: row.menu_tipo,
            createdAt: row.menu_createdAt,
            updatedAt: row.menu_updatedAt,
          },
        };
  
        if (existingOrder) {
          existingOrder.orderDetails.push(orderDetail);
        } else {
          acc.push({
            order_id: row.order_id,
            table_number: row.table_number,
            order_date: row.order_date,
            status: row.status,
            total_price: row.total_price,
            special_instructions: row.special_instructions,
            for_takeout: row.for_takeout,
            method_payment: row.method_payment,
            client_id: row.client_id,
            created_at: row.created_at,
            updated_at: row.updated_at,
            cliente: {
              id: row.cliente_id,
              nombre: row.cliente_nombre,
              apellido: row.cliente_apellido,
              // Agrega otras propiedades del cliente si es necesario
            },
            orderDetails: [orderDetail],
          });
        }
  
        return acc;
      }, []);
  
      res.status(200).json({ success: true, data: formattedOrders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error al obtener los elementos del carrito', error });
    }
  };


export const marcarPreparado = async (req, res) => {

    const { id, status } = req.body;

    function getDateTime() {
        var now     = new Date(); 
        var year    = now.getFullYear();
        var month   = now.getMonth()+1; 
        var day     = now.getDate();
        var hour    = now.getHours();
        var minute  = now.getMinutes();
        var second  = now.getSeconds(); 
        if(month.toString().length == 1) {
             month = '0'+month;
        }
        if(day.toString().length == 1) {
             day = '0'+day;
        }   
        if(hour.toString().length == 1) {
             hour = '0'+hour;
        }
        if(minute.toString().length == 1) {
             minute = '0'+minute;
        }
        if(second.toString().length == 1) {
             second = '0'+second;
        }   
        var dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;   
         return dateTime;
    }




     let updated_at = null;

    if (status === 'Served') {
        updated_at = getDateTime();
    }

    try {
        let query = "UPDATE orders SET status = ?";
        const params = [status];

        // Si el estado es 'Served', incluir la actualización de 'updated_at'
        if (status === 'Served') {
            query += ", updated_at = ?";
            params.push(updated_at);
        }

        query += " WHERE order_id = ?";
        params.push(id);

        const [rows] = await pool.query(query, params);

        res.json({ success: true, message: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error });
    }
}


export const getLastedOrders = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM `orders` WHERE status = "Completed" OR status = "Served" ORDER BY order_id DESC LIMIT 5')
        res.json(rows)
    } catch (error) {
        console.log(error)
    }
}