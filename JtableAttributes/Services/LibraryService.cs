using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JtableAttributes.Services
{
    public class LibraryService
    {

        public IEnumerable<Book> GetAllBooks()
        {
            SQLiteConnection sqLiteConnection = null;
            var books = new List<Book>();
            try
            {
                sqLiteConnection = GetConnection();
                var command = CreateCommand(sqLiteConnection, "SELECT rowid, * FROM Books;", CommandType.Text);
                sqLiteConnection.Open();

                var dataReader = command.ExecuteReader();

                while (dataReader.Read())
                {
                    books.Add(CreateBook(dataReader));
                }
                return books;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (sqLiteConnection != null && sqLiteConnection.State != ConnectionState.Closed)
                {
                    sqLiteConnection.Close();
                }
            }

        }

        public Book GetBookById(int id)
        {
            SQLiteConnection sqLiteConnection = null;
            Book book = null;
            try
            {
                sqLiteConnection = GetConnection();
                var command = CreateCommand(sqLiteConnection, "SELECT rowid, * FROM Books WHERE rowid = " + id.ToString(), CommandType.Text);
                sqLiteConnection.Open();

                var dataReader = command.ExecuteReader();

                while (dataReader.Read())
                {
                    book = CreateBook(dataReader);
                    break;
                }
                return book;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (sqLiteConnection != null && sqLiteConnection.State != ConnectionState.Closed)
                {
                    sqLiteConnection.Close();
                }
            }
        }

        public void InsertBook(Book book)
        {
            SQLiteConnection sqLiteConnection = null;
            try
            {
                var sql = string.Format("INSERT INTO Books VALUES('{0}', '{1}'); Select last_insert_rowid()",
                    book.Title, book.Text);

                sqLiteConnection = GetConnection();
                var command = CreateCommand(sqLiteConnection, sql, CommandType.Text);
                sqLiteConnection.Open();

                book.Id = Convert.ToInt32(command.ExecuteScalar());

            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (sqLiteConnection != null && sqLiteConnection.State != ConnectionState.Closed)
                {
                    sqLiteConnection.Close();
                }
            }
        }

        public int UpdateBook(Book book)
        {
            SQLiteConnection sqLiteConnection = null;
            try
            {
                var sql = string.Format("UPDATE Books SET Title = '{0}', Text = '{1}' WHERE rowid = {2};",
                    book.Title, book.Text, book.Id);

                sqLiteConnection = GetConnection();
                var command = CreateCommand(sqLiteConnection, sql, CommandType.Text);
                sqLiteConnection.Open();

                return command.ExecuteNonQuery();
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (sqLiteConnection != null && sqLiteConnection.State != ConnectionState.Closed)
                {
                    sqLiteConnection.Close();
                }
            }
        }

        public int DeleteBook(int id)
        {
            SQLiteConnection sqLiteConnection = null;
            try
            {
                var sql = string.Format("DELETE  Books WHERE rowid = {0};", id);

                sqLiteConnection = GetConnection();
                var command = CreateCommand(sqLiteConnection, sql, CommandType.Text);
                sqLiteConnection.Open();

                return command.ExecuteNonQuery();
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (sqLiteConnection != null && sqLiteConnection.State != ConnectionState.Closed)
                {
                    sqLiteConnection.Close();
                }
            }
        }


        private Book CreateBook(SQLiteDataReader dataReader)
        {
            var book = new Book();

            book.Id = dataReader.GetInt32(0);
            book.Title = dataReader.GetString(1);
            book.Text = dataReader.GetString(2);

            return book;
        }

        private SQLiteCommand CreateCommand(SQLiteConnection connection, string sql, CommandType commandType)
        {
            var cmd = connection.CreateCommand();
            cmd.CommandText = sql;
            cmd.CommandType = commandType;
            return cmd;
        }

        private SQLiteConnection GetConnection()
        {
            return new SQLiteConnection(new SQLiteConnectionStringBuilder("").ConnectionString);
        }
    }

}