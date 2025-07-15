package com.nftcar.alyra.repository;

import com.nftcar.alyra.domain.RentalContract;
import com.nftcar.alyra.domain.UserExtended;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

@Repository
public interface RentalContractRepository extends JpaRepository<RentalContract, Long> {


    @Query(
        value = "select rc from RentalContract rc " +
            "left join fetch rc.locataire " +
            "left join fetch rc.loueur " +
            "left join fetch rc.vehicle",
        countQuery = "select count(rc) from RentalContract rc"
    )
    Page<RentalContract> findAllWithEagerRelationships(Pageable pageable);




}
