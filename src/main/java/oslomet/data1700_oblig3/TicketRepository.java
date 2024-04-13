package oslomet.data1700_oblig3;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


import java.util.List;


@Repository
public class TicketRepository {

    @Autowired
    private JdbcTemplate db;

    public void saveTicket(Ticket ticket) {
        String sql = "INSERT INTO Ticket (film, number, firstName, lastName, phone, email)" +
                " VALUES (?, ?, ?, ?, ?, ?)";

            db.update(sql, ticket.getFilm(), ticket.getNumber(),
                    ticket.getFirstName(), ticket.getLastName(), ticket.getPhone(),
                    ticket.getEmail());

        }



    public List<Ticket> getTickets() {
        String sql = "SELECT * FROM Ticket";

            List<Ticket> allTickets = db.query(sql,
                    new BeanPropertyRowMapper<>(Ticket.class));
            return allTickets;

    }

    public void deleteAllTickets() {
        String sql = "DELETE FROM Ticket";
        db.update(sql);
    }
}

