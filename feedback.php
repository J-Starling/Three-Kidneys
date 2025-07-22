<html>

<head>
    <title>Три почки - Обратная связь</title>
	<link rel="icon" href="logo.png" type="image/png">
    <link rel="stylesheet" type="text/css" href="style.css">
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
    <header>
        <img src="kidney_l.png" width="210" align="left">
        <img src="kidney_r.png" width="210" align="right">
        <h1>Магазин органов "Три почки™"</h1>
        <img src="logo.png" width="210" align="center">
    </header>
    <nav>
        <ul>
            <li><a href="index.html">Главная</a></li>
            <li><a href="organs.html">Органы</a></li>
            <li><a href="feedback.php">Обратная связь</a></li>
            <li><a href="contacts.html">Контакты</a></li>
        </ul>
    </nav>
    <main>
        <div id="content">
            <div id="article">
                <h2>Обратная связь</h2>
                <p>Мы ценим ваше мнение! Оставьте свои пожелания или замечания, и мы обязательно их рассмотрим.</p>
                <?php
                session_start();

                $servername = "localhost";
                $username = "root";
                $password = "";
                $dbname = "db";

                $conn = new mysqli($servername, $username, $password, $dbname);

                if ($conn->connect_error) {
                    die("Ошибка соединения: " . $conn->connect_error);
                }

                if (isset($_SESSION['form_success'])) {
                    unset($_SESSION['form_success']);
                    echo "<div style='background-color: lightgreen; padding: 10px; border-radius: 5px; margin-bottom: 20px;'>";
                    echo "<strong>Спасибо за обратную связь! Ваше сообщение было добавлено.</strong><br>";
                    echo "</div>";
                } elseif (isset($_SESSION['form_error'])) {
                    echo "<div style='background-color: red; color: white; padding: 10px; border-radius: 5px; margin-bottom: 20px;'>";
                    echo "<strong>" . $_SESSION['form_error'] . "</strong><br>";
                    echo "</div>";
                    unset($_SESSION['form_error']);
                }

                // Получаем все сообщения из базы данных
                $query = "SELECT * FROM feedback ORDER BY id DESC";
                $result = $conn->query($query);

                if ($result->num_rows > 0) {
                    echo "<div style='margin: 20px 0;'>";
                    echo "<h3>Все сообщения:</h3>";
                    echo "<div style='max-height: 300px; overflow-y: auto; border: 1px solid #ddd; padding: 10px; border-radius: 5px;'>";
                    
                    while($row = $result->fetch_assoc()) {
                        echo "<div style='background-color: #f9f9f9; padding: 10px; margin-bottom: 10px; border-radius: 5px; border-left: 3px solid #b20000;'>";
                        echo "<p><strong>Имя:</strong> " . htmlspecialchars($row['sirname']) . "</p>";
                        echo "<p><strong>Email:</strong> " . htmlspecialchars($row['email']) . "</p>";
                        echo "<p><strong>Сообщение:</strong> " . nl2br(htmlspecialchars($row['message'])) . "</p>";
                        echo "<p style='font-size: 0.8em; color: #666;'>" . date('d.m.Y H:i', strtotime($row['created_at'])) . "</p>";
                        echo "</div>";
                    }
                    
                    echo "</div>";
                    echo "</div>";
                } else {
                    echo "<p>Пока нет сообщений. Будьте первым!</p>";
                }


                $conn->close();
                ?>
                <form action="form.php" method="POST">
                <p>
                    <label for="sirname">Имя:</label>
                    <input type="text" id="sirname" name="sirname" placeholder="Ваше имя" required>
                </p>
                <p>
                    <label for="email">Ваш Email:</label>
                    <input type="text" id="email" name="email" placeholder="example@example.com" required>
                </p>
                <p>
                    <label for="message">Сообщение:</label>
                    <textarea id="message" name="message" placeholder="Ваше сообщение..." required></textarea>
                </p>
                <p>
                    <input type="submit" name="send" value="Отправить">
                </p>
                </form>
                
                <div style="margin-top: 2rem; padding: 1rem; background: #f0f0f0; border-radius: 8px;">
                    <h3>Часто задаваемые вопросы</h3>
                    <details>
                        <summary>Как быстро доставляют органы?</summary>
                        <p>Доставка осуществляется в течение 24 часов после заказа. Мы используем специальные криогенные контейнеры для сохранения качества органов.</p>
                    </details>
                    <details>
                        <summary>Есть ли гарантия на органы?</summary>
                        <p>Да, все наши органы имеют гарантию 1 год или до первой успешной трансплантации.</p>
                    </details>
                    <details>
                        <summary>Можно ли вернуть орган?</summary>
                        <p>Возврат возможен в течение 14 дней при условии сохранения товарного вида и всех необходимых документов.</p>
                    </details>
                </div>
            </div>
        </div>
    </main>
    <footer>
        Ваши органы - наша забота!
    </footer>
	
	<script>
	if ('serviceWorker' in navigator){
		navigator.serviceWorker.register('/server_worker', {scope: '/'});
	}
	</script>

</body>

</html>
