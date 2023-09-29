package com.project.Glog.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.joda.time.DateTime;
import org.joda.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "bookMessage")
public class BookMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String message;

    @CreatedDate
    private LocalDateTime createdAt;

    @ManyToOne
    private GuestBook guestBook;

    @ManyToOne
    private User user;
}
