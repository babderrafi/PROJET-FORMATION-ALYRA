package com.nftcar.alyra.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Revenue.
 */
@Entity
@Table(name = "revenue")
public class Revenue implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "month", nullable = false)
    private Instant month;

    @NotNull
    @Column(name = "amount_eur", precision = 21, scale = 2, nullable = false)
    private BigDecimal amountEur;

    @NotNull
    @Column(name = "amount_usdc", precision = 21, scale = 2, nullable = false)
    private BigDecimal amountUsdc;

    @ManyToOne
    private Car car;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Revenue id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getMonth() {
        return this.month;
    }

    public Revenue month(Instant month) {
        this.setMonth(month);
        return this;
    }

    public void setMonth(Instant month) {
        this.month = month;
    }

    public BigDecimal getAmountEur() {
        return this.amountEur;
    }

    public Revenue amountEur(BigDecimal amountEur) {
        this.setAmountEur(amountEur);
        return this;
    }

    public void setAmountEur(BigDecimal amountEur) {
        this.amountEur = amountEur;
    }

    public BigDecimal getAmountUsdc() {
        return this.amountUsdc;
    }

    public Revenue amountUsdc(BigDecimal amountUsdc) {
        this.setAmountUsdc(amountUsdc);
        return this;
    }

    public void setAmountUsdc(BigDecimal amountUsdc) {
        this.amountUsdc = amountUsdc;
    }

    public Car getCar() {
        return this.car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public Revenue car(Car car) {
        this.setCar(car);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Revenue)) {
            return false;
        }
        return id != null && id.equals(((Revenue) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Revenue{" +
            "id=" + getId() +
            ", month='" + getMonth() + "'" +
            ", amountEur=" + getAmountEur() +
            ", amountUsdc=" + getAmountUsdc() +
            "}";
    }
}
